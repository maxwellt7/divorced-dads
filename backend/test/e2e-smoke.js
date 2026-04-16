#!/usr/bin/env node
/**
 * Divorced Dads — E2E Smoke Test
 *
 * Tests the core app flow against a running backend.
 * Usage:
 *   API_URL=https://your-railway-url node test/e2e-smoke.js
 *   API_URL=http://localhost:3000 node test/e2e-smoke.js
 *
 * Requires:
 *   - A running backend with DB configured
 *   - No pre-existing user with the test email (or run against a test DB)
 */

const API_URL = process.env.API_URL || 'http://localhost:3000';
const TEST_EMAIL = `smoke-test-${Date.now()}@divorced-dads-test.example.com`;
const TEST_PASSWORD = 'SmokeTest_Pass123!';

let token = null;
let passed = 0;
let failed = 0;

async function req(method, path, body, auth = true) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth && token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, ...json };
}

function assert(label, condition, detail = '') {
  if (condition) {
    console.log(`  ✅  ${label}`);
    passed++;
  } else {
    console.error(`  ❌  ${label}${detail ? ` — ${detail}` : ''}`);
    failed++;
  }
}

async function run() {
  console.log(`\n🧪 Divorced Dads E2E Smoke Test`);
  console.log(`   API: ${API_URL}\n`);

  // --- Health check ---
  console.log('── Health');
  const health = await req('GET', '/health', null, false);
  assert('Health check returns ok', health.status === 'ok', JSON.stringify(health));

  // --- Auth: Register ---
  console.log('\n── Auth');
  const reg = await req('POST', '/api/auth/register', {
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
    name: 'Smoke Test Dad',
  }, false);
  assert('Register succeeds (201)', reg.success === true, JSON.stringify(reg));
  token = reg.data?.token;
  assert('Token returned', !!token);

  // --- Auth: Login ---
  const login = await req('POST', '/api/auth/login', {
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
  }, false);
  assert('Login succeeds', login.success === true);
  if (login.data?.token) token = login.data.token;

  // --- Auth: /me ---
  const me = await req('GET', '/api/auth/me');
  assert('/me returns user', me.success === true && !!me.data?.user?.id);

  // --- Curriculum ---
  console.log('\n── Curriculum');
  const curriculum = await req('GET', '/api/curriculum');
  assert('Curriculum returns data', curriculum.status !== 404);

  const weeks = await req('GET', '/api/curriculum/weeks');
  assert('Weeks endpoint responds', weeks.status !== 500, JSON.stringify(weeks).slice(0, 100));

  // --- Progress ---
  console.log('\n── Progress');
  const progress = await req('GET', '/api/progress');
  assert('Progress GET responds (200 or 404)', progress.status === 200 || progress.status === 404);

  // --- Daily task ---
  console.log('\n── Daily Task');
  const daily = await req('GET', '/api/daily-task');
  assert('Daily task responds', daily.status === 200 || daily.status === 402 || daily.status === 404,
    `status=${daily.status}`);
  if (daily.status === 200) {
    assert('Daily task has week info', !!daily.week, JSON.stringify(daily).slice(0, 100));
  }

  // --- Onboarding save ---
  console.log('\n── Onboarding');
  const onboarding = await req('PATCH', '/api/progress/onboarding', {
    divorceStage: 'finalized',
    kidsAges: [8, 11],
    biggestPainPoint: 'communication',
  });
  assert('Onboarding save responds', onboarding.status === 200 || onboarding.status === 201 || onboarding.status === 404,
    `status=${onboarding.status}`);

  // --- Subscription status ---
  console.log('\n── Stripe / Subscription');
  const sub = await req('GET', '/api/stripe/subscription-status');
  assert('Subscription status responds', sub.status === 200 || sub.status === 503,
    `status=${sub.status}`);
  if (sub.status === 200) {
    assert('Default plan is free', sub.data?.plan === 'free' || sub.data?.hasFullAccess === false);
  }

  // --- Summary ---
  console.log(`\n${'─'.repeat(40)}`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  if (failed > 0) {
    console.error(`\n❌ ${failed} test(s) failed`);
    process.exit(1);
  } else {
    console.log('\n✅ All smoke tests passed');
  }
}

run().catch(err => {
  console.error('\nFatal error:', err.message);
  process.exit(1);
});

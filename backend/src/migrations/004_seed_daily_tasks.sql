-- ============================================================
-- Divorced Dads — Seed: 112 Daily Tasks (16 weeks × 7 days)
-- ============================================================
-- Week IDs are looked up by week_number within the program.
-- Run after 001 (schema) and 002 (weeks seed).

-- Day 1 (Week 1, Day 1)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 1, 'Take Your First Honest Inventory',
       'Before you can close a gap, you have to see it clearly. Today you step back from survival mode and take stock of your life as a divorced dad — not to beat yourself up, but to get honest about where you actually are. This is your starting line, and every champion knows exactly where they begin.

Pull out a notebook or open your phone notes. Rate yourself 1–10 in these areas: emotional stability, consistency as a dad, physical health, financial health, relationship with your co-parent, relationship with your kids. No editing, no excuses — just honest numbers.

This inventory isn''t a verdict. It''s a map. The men who make the biggest transformations are the ones who stare at the map without flinching.',
       'Where is the gap largest? What would a 10 in that area look and feel like?',
       'Help the user explore their inventory honestly. Ask follow-up questions about the area with the widest gap. Do not offer solutions yet — this week is about awareness. Be warm but grounded.', 1
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 1
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 2 (Week 1, Day 2)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 2, 'Write the Letter You''ll Never Send',
       'Three years from now, your kids will be three years older. They''ll remember this period — not perfectly, but they''ll carry impressions of who you were during the hardest season of your life. Today you write to them from that future place.

Write a letter — not what you''ll actually say to them, but what your heart wants them to know. Write about your fears, your love, your commitment. Write about who you''re becoming and why they''re the reason. This letter stays private; the only audience is you and God.

Letters like this have a way of unlocking something that logic can''t reach. This is how you start training your nervous system to parent from love instead of fear.',
       'What did you write that surprised you? What do you want your kids to feel when they think of you during this time?',
       'Ask the user what it felt like to write the letter. Explore themes of love, fear, and commitment. Help them articulate the kind of dad they''re reaching toward. Be compassionate and unhurried.', 2
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 1
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 3 (Week 1, Day 3)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 3, 'Map Your Village',
       'Divorce has a way of shrinking a man''s world. Friends drift. Family doesn''t know what to say. You end up carrying more alone than any human was designed to carry. Today you audit your support network and identify where it''s thin.

Draw three concentric circles. Inner circle: people who know everything and show up no matter what (aim for 1–3 people). Middle circle: trusted friends and family you can call when things are hard. Outer circle: acquaintances, colleagues, and community. Write names in each ring.

If your inner circle is empty or thin, that''s the most important thing you learned today. Men don''t heal in isolation — they heal in brotherhood. This week, identify one person who could move closer to that inner ring.',
       'Who is actually in your corner right now? Where are the holes in your village?',
       'Help the user map their support network. If they identify isolation, normalize it without letting them stay there. Gently push toward identifying one relationship they could invest in. Be practical and warm.', 3
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 1
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 4 (Week 1, Day 4)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 4, 'Define Your North Star',
       'A ship without a destination drifts wherever the current takes it. Today you define your north star as a dad — the vision so clear and compelling that on the hard days, it pulls you forward even when you don''t feel like moving.

Describe in vivid detail the dad you want to be by the time your kids are adults. What does your relationship with them look like? How do they describe you to their own kids someday? What did you teach them about being a man, a father, a human being?

This north star doesn''t have to be perfect — it just has to be yours. Write it in present tense, as if it''s already true. Your brain doesn''t know the difference between vividly imagined and real.',
       'Read your north star out loud. How does it feel in your body? What would have to change about your daily life to align with it?',
       'Help the user craft or refine their north star vision. Ask sensory questions — what does it look like, sound like, feel like. Help them connect the vision to today''s choices. Be energizing and forward-focused.', 4
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 1
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 5 (Week 1, Day 5)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 5, 'Your Morning Power Statement',
       'The first five minutes of your morning program your nervous system for the day. Most divorced dads spend those minutes in dread, scrolling, or dreading the co-parent text. Today you design a better beginning.

Write a morning power statement — 3 to 5 sentences that are true and that remind you of who you''re choosing to be. Not affirmations you don''t believe; statements that are factually true and directionally powerful. Example: "I am a good father. I am getting better every day. My kids feel my love. I handle hard things. I am enough."

Say it out loud tomorrow morning before you touch your phone. Do it for seven days and notice what shifts.',
       'What five things do you most need to remind yourself of right now? Which one feels most challenging to believe?',
       'Help the user craft their personal morning statement. Push back gently if they write things they clearly don''t believe — work toward statements that stretch without snapping. Help them find the words that land in the body, not just the head.', 5
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 1
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 6 (Week 1, Day 6)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 6, 'The Father You Had vs. The Father You''re Becoming',
       'Whether your own father was great, absent, abusive, or somewhere in between — he shaped your blueprint for fatherhood. Today you examine that blueprint honestly, keep what works, and consciously reject what doesn''t.

Write two columns. Column A: things your father did well or qualities you want to carry forward. Column B: patterns from his parenting you''re consciously choosing to break. Be honest and specific. This exercise isn''t about blaming him — it''s about choosing, with intention, what gets passed down.

You are the fulcrum point in your family lineage. What you heal and what you choose here echoes into generations.',
       'What is the single most important pattern from your father''s parenting that you want to transform in your own?',
       'Be sensitive — this exercise can surface old wounds. Hold space without rushing. Ask clarifying questions about what "doing it differently" looks like in practical day-to-day moments. Be compassionate and grounding.', 6
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 1
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 7 (Week 1, Day 7)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 7, 'Week 1 Integration: Set Your Foundation',
       'You have completed your first week. This is not a small thing — most men who go through divorce never turn inward like this. You''re already different from the man who started Monday.

Review the six days: your inventory, your letter, your village map, your north star, your morning statement, your fatherhood blueprint. What themes keep surfacing? What is the one thing Week 1 is pointing you toward most urgently?

Today you write your Week 1 Declaration — one paragraph that captures what you''re committing to and why. Read it to someone in your inner circle if you can.',
       'What was the hardest moment this week? What surprised you most about yourself?',
       'Celebrate the completion of Week 1 genuinely. Help the user synthesize the week''s themes into a clear declaration. Ask what they''re taking into Week 2. Be affirming and integrative.', 7
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 1
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 8 (Week 2, Day 1)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 1, 'Meet the Boy',
       'Somewhere inside you is the version of you who was seven years old, ten years old, fourteen. He still has opinions about whether you''re safe, whether love can be trusted, whether you''re good enough. This week you meet him.

Find a photo of yourself as a child — the younger the better. Sit with it for five minutes. Don''t analyze; just look. Notice what comes up in your body. Does your chest tighten? Do you feel tenderness? Distance? That feeling is data.

The goal this week isn''t therapy. It''s recognition. When you know what that boy needed, you''ll understand more clearly what your kids need — and what drives you when you''re at your worst.',
       'What do you feel when you look at that boy? What did he most need that he may not have fully received?',
       'Be extremely gentle here. Some men have trauma in this territory. Move slowly, affirm courage. Ask what the boy in the photo believed about himself, about love, about being a man. Create safety above all.', 8
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 2
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 9 (Week 2, Day 2)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 2, 'Childhood Wounds and Fatherhood',
       'Our deepest wounds often come from our earliest relationships. Not because our parents were monsters — but because they were human, and sometimes their own wounds became our wounds. Today you trace the line between your childhood and your current fathering.

Identify one or two experiences from your childhood that shaped how you show up as a dad — especially in conflict, in tenderness, or in discipline. Write about the experience and the belief it created. Then write about how that belief shows up in your parenting today.

Awareness is the beginning of choice. You can''t change what you can''t see.',
       'What belief about yourself, about love, or about safety did you form as a kid that still operates in your parenting today?',
       'Help the user draw clear connections between past experience and present behavior. Be a curious, non-judgmental guide. If they surface something heavy, slow down and honor it. Don''t rush toward solutions — this is about seeing clearly.', 9
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 2
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 10 (Week 2, Day 3)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 3, 'What Your Child Self Needed',
       'Today you write a letter — but this time to your younger self. Not to give advice (though you might), but to offer what that boy most needed: to be seen, to be told the truth, to be given permission to feel, to know he was enough.

Write to him at the age that feels most tender or most formative. Tell him what you wish someone had said. Tell him what''s going to happen and that he''s going to make it. Tell him what kind of man he''s going to become.

This exercise is not sentimental — it''s neurological. When you give compassion to your younger self, you actually rewire how your nervous system holds that memory.',
       'What did you most want to say to him? What was hardest to write?',
       'Ask what it felt like to write the letter. Help the user notice how showing compassion to their younger self feels different from their normal internal self-talk. Bridge to how this changes how they might show up for their own kids.', 10
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 2
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 11 (Week 2, Day 4)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 4, 'The Moment Everything Changed',
       'For most divorced dads, there''s a before and an after. A moment — or a slow accumulation of moments — when the marriage broke. Today you write honestly about that transition: what it took from you, what it revealed about you, and what it forced you to become.

This isn''t about blame or re-litigating what happened. It''s about understanding how the story you tell yourself about the divorce shapes your identity as a dad. Are you a victim in the story? A villain? A survivor? A man who is growing?

The story you choose determines the man you become.',
       'What story are you telling yourself about the divorce? Is that story empowering you or keeping you stuck?',
       'Help the user examine their divorce narrative without judgment. Gently challenge victim or villain frameworks and help them find a more empowering story — not a false one, but a true one that centers growth and agency. Be tactful and grounded.', 11
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 2
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 12 (Week 2, Day 5)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 5, 'Healing the Father Wound',
       'The "father wound" is the unmet need from your relationship with your own dad. It doesn''t require an absent or abusive father — even loving fathers leave gaps. Today you name yours specifically.

Write about your relationship with your father. What did he give you that you treasure? What did you desperately need from him that you didn''t receive? How has that gap shaped your relationship with yourself — and with your own kids?

Naming the wound is not weakness. It is the first act of healing it — and of ensuring it doesn''t become your children''s wound too.',
       'In one sentence, what is your father wound? What would it mean for your children if you healed it?',
       'Hold this with great care. Some users will have significant pain here. Be a steady, compassionate presence. Help them see the connection between healing their own wound and breaking the generational pattern. Honor courage.', 12
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 2
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 13 (Week 2, Day 6)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 6, 'Write to Your Past Self',
       'You''ve spent the week looking back. Today you speak from your wiser, more aware present self to the man you were before the divorce — or at the worst moment of it.

Write to that past version of yourself. What do you want him to know? What would you do differently? What do you want to tell him about what''s coming, about what he''s made of, about what matters?

This isn''t about regret — it''s about integration. When you can be compassionate to the past version of yourself, you stop carrying him as a burden and start carrying him as a teacher.',
       'What is the most important thing you would say to that version of yourself? What does that tell you about what you value now?',
       'Help the user move from regret toward wisdom. If they focus on failures, gently redirect to what those failures taught them and what they''d want their past self to know. Help them harvest learning from pain.', 13
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 2
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 14 (Week 2, Day 7)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 7, 'Week 2 Integration: Compassion for Your Journey',
       'Inner child work is hard. You showed up for a week of looking inward — at wounds, at your father, at your own younger self. That takes a kind of courage most men never find.

Today you simply sit with what the week surfaced. What themes kept appearing? What beliefs about yourself became visible this week that you want to release? What compassion do you want to extend to your own journey?

Write your Week 2 Declaration: what you''re choosing to believe about yourself as you move forward.',
       'What is the most significant thing you learned about yourself this week? How does it change how you want to show up for your kids?',
       'Integrate and affirm. Celebrate the courage of the week. Help the user land on one clear belief shift they''re making. Connect it forward to what''s possible as they build the life and fatherhood they''re reaching for.', 14
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 2
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 15 (Week 3, Day 1)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 1, 'Design Your Power Morning',
       'The morning is the rudder of the day. A reactive morning produces a reactive day. A powerful morning — even 30 minutes of intentional practice — sets a completely different trajectory. Today you design yours.

A power morning has four elements: body activation (movement, cold exposure, or breathwork), mind input (reading, journaling, or reflection), intention-setting (your morning statement + priorities), and connection (prayer, gratitude, or a brief check-in with someone you love). You don''t need hours — you need a sequence you''ll actually keep.

Design a 20–30 minute morning that works for your actual life, including custody days when kids are present.',
       'What does your morning currently look like? What is one thing you could add or subtract to make it more powerful?',
       'Be practical and realistic. Help the user build a morning routine they can actually sustain. Ask about custody schedule to tailor the advice. Celebrate any version of intentional morning practice — perfect is the enemy of good here.', 15
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 3
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 16 (Week 3, Day 2)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 2, 'The Ice Bath Protocol',
       'Starting Week 3, ice bath days are integrated into your routine (cold shower counts if no tub is available). This is not a trend — it''s a practice with documented benefits: dopamine spike, cortisol regulation, mental toughness training, and a daily proof that you can do hard things.

The protocol is simple: 2–3 minutes in cold water (50–60°F), controlled breathing, no music — just you and the cold. Before you get in, say your morning power statement. While you''re in, breathe slow and stay present. When you get out, notice what you feel.

The ice bath is a metaphor for everything this program asks of you: voluntary discomfort in service of growth. Your kids see a dad who does hard things.',
       'What was your first cold exposure experience like? What showed up in your mind when the cold hit?',
       'Ask about the user''s experience with cold exposure. If they haven''t tried it yet, encourage them warmly. Explore the mental experience — what thoughts arise, how they handle discomfort. Connect the practice to their capacity for resilience as a dad.', 16
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 3
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 17 (Week 3, Day 3)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 3, 'Your Energy Management System',
       'Time management is a myth. Energy management is the real game. You can have all the time in the world, but if your energy is depleted, you''ll be present in body only. Your kids don''t need more of your hours — they need more of your energy.

Map your energy across the day: when are you sharpest, when do you hit a lull, when do you recover? Match your most important work and your most important dad-moments to your high-energy windows. Protect your energy ruthlessly: sleep, nutrition, movement, and mental detox (news, social media, and toxic conversations drain it fast).

An energized dad is a present dad. This is a daily practice, not a one-time fix.',
       'What are the biggest energy drains in your current life? What gives you energy? How can you shift the ratio?',
       'Help the user think practically about energy management — not abstract wellness advice but real-life scheduling. Ask about their biggest energy drains and help them identify one thing to protect or eliminate. Be grounded and tactical.', 17
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 3
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 18 (Week 3, Day 4)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 4, 'Phone Boundaries and Presence',
       'The phone is the greatest threat to fatherhood in the modern era — not because it''s evil, but because it competes for the one thing your kids need most: your attention. Today you design your phone boundaries.

Create three rules: (1) no phone for the first 30 minutes of your morning, (2) no phone during focused time with your kids (meals, homework, bedtime), (3) a hard stop time in the evening. These rules are simple and most dads violate all three daily.

Presence is not a feeling — it''s a decision you enforce with boundaries. Your kids feel the difference immediately, even if they can''t name it.',
       'Honestly track your phone usage today. When does it pull you away from your kids or yourself? What boundary would make the biggest difference?',
       'Don''t shame — explore. Ask what the user uses their phone for during dad-time. Help them identify specific, achievable phone boundaries. Connect presence with their north star vision of fatherhood. Be encouraging and practical.', 18
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 3
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 19 (Week 3, Day 5)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 5, 'Movement as Medicine',
       'Exercise is not optional for a man going through divorce. Your nervous system is under sustained stress, your cortisol is elevated, and your brain desperately needs the chemistry that movement produces. This isn''t about six-pack abs — it''s about being emotionally regulated enough to be the dad your kids need.

Today you commit to a minimum movement standard: at least 30 minutes of deliberate movement five days per week. It doesn''t have to be a gym — it can be a walk, a bike ride, a pickup game. What matters is consistency and intentionality.

Schedule it right now. Block it on your calendar. Treat it as a non-negotiable, because for divorced dads, it is.',
       'How are you currently using movement to regulate your mental and emotional state? What would change if you moved every day without exception?',
       'Meet the user where they are physically. No judgment about fitness level. Help them identify a form of movement they actually enjoy and can sustain. Connect physical regulation to emotional availability for their kids. Be energizing.', 19
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 3
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 20 (Week 3, Day 6)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 6, 'Evening Wind-Down Ritual',
       'How you end the day determines how you start the next one. Most divorced dads end their evenings doom-scrolling, ruminating about the co-parent, or numbing with TV and alcohol. Today you design a better ending.

A powerful evening ritual has three elements: reflection (what went well, what you''re grateful for, what you''ll do differently tomorrow), release (a deliberate transition out of the day — breathwork, journaling, reading), and preparation (lay out what tomorrow needs from you so the morning starts with intention).

Even fifteen intentional minutes at the end of the day can transform your sleep quality and your morning state.',
       'How do you currently end your day? What emotion do you carry into sleep? What would a 10/10 evening ritual look like for you?',
       'Help the user design an evening ritual that actually fits their life. If kids are present, adapt accordingly. Ask about current evening habits without judgment. Help them identify one small change that could make a meaningful difference. Be practical and warm.', 20
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 3
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 21 (Week 3, Day 7)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 7, 'Week 3 Integration: Your Routine Blueprint',
       'This week you built the scaffolding of a new life. Routine isn''t glamorous, but it''s the foundation everything else rests on. The dads who make it through divorce stronger than they were before almost always point to daily structure as the turning point.

Review what you''ve built: your power morning, your cold exposure practice, your energy management, your phone boundaries, your movement habit, your evening ritual. What is working? What needs adjustment? What are you committed to sustaining?

Write your Week 3 Declaration and share it with one person who can hold you accountable.',
       'Which part of your new routine has had the biggest impact in just one week? What would your life look like in 90 days if you held these habits?',
       'Celebrate what was built. Help the user see the cumulative effect of small daily practices. Troubleshoot any pieces that aren''t sticking. Help them identify their accountability partner. Be affirming and forward-looking.', 21
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 3
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 22 (Week 4, Day 1)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 1, 'What Are You Carrying?',
       'Most divorced dads are walking around with an invisible weight that has never been named, let alone set down. Grief for the marriage. Rage at the injustice. Fear for the kids. Shame about what happened. Loneliness so thick it''s hard to breathe. Today you name it.

List every emotional weight you''re currently carrying. Be specific and honest. Don''t categorize or analyze — just inventory. The weight of the custody schedule. The weight of seeing your kids cry. The weight of the financial fear. All of it.

Naming is not complaining. It is the first step toward expanding your capacity to hold what cannot be immediately changed.',
       'What is the heaviest thing on your list? What would it mean to hold it with more grace — not to stop feeling it, but to carry it without being crushed?',
       'Create deep safety for this. Some of what surfaces may be grief that has never had an outlet. Listen fully before suggesting anything. Normalize the weight. Help the user distinguish between what can be changed and what must simply be held with more grace.', 22
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 4
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 23 (Week 4, Day 2)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 2, 'The Capacity to Feel',
       'Most men were raised to have a three-emotion range: happy, angry, and numb. Divorce breaks that system. The pain is too big, too complex, and too sustained for that narrow emotional bandwidth. Today you start expanding.

Practice naming emotions with specificity today. Not "I''m stressed" — but what is underneath the stress? Grief? Fear? Betrayal? Shame? Loneliness? The more specifically you can name what you feel, the more effectively your nervous system can process and release it.

Emotional range is not weakness. It is a leadership skill. The dad who can name what he feels is the dad who doesn''t explode, shut down, or disappear.',
       'What emotion did you most avoid expressing in your marriage? What would it look like to allow yourself to feel it fully and safely?',
       'Teach gently. Don''t lecture — ask questions that draw out emotional specificity. If the user deflects with humor or analysis, gently return to feeling. This is a practice, not a performance. Be patient.', 23
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 4
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 24 (Week 4, Day 3)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 3, 'Breathwork as Expansion',
       'Your breath is the only function of your autonomic nervous system you can consciously control — which makes it your most powerful tool for emotional regulation. Today you learn a basic breathwork practice and use it.

Box breathing: inhale 4 counts, hold 4 counts, exhale 4 counts, hold 4 counts. Repeat for 5 minutes. Do it now, before reading further. Notice what shifts in your body, your mind, your emotional state.

This practice, done for five minutes daily, has measurable effects on cortisol levels and emotional reactivity. For a divorced dad navigating constant triggers, this is tactical — not woo-woo.',
       'What did you notice in your body during the breathwork? When during your typical day do you most need a tool like this?',
       'Walk the user through a brief breathwork practice in the chat itself. Ask what they noticed. Help them identify three daily trigger moments where breath could interrupt their reactive pattern. Make it practical and immediate.', 24
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 4
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 25 (Week 4, Day 4)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 4, 'Your Emotional Vocabulary',
       'Research shows that men who can name their emotions with specificity are significantly better at regulating them. Today you expand your emotional vocabulary with intention.

Study a feelings wheel (look one up — it''s a diagram of 6 core emotions that branches into dozens of nuanced sub-emotions). For each primary emotion — joy, fear, anger, sadness, disgust, surprise — identify three specific sub-emotions you''ve felt in the past month. Name the situations that produced them.

Language creates reality. When you have words for what you feel, you have power over it. When you don''t, it has power over you.',
       'Which emotions are hardest for you to name or admit? Why do you think that is?',
       'Explore the user''s emotional vocabulary with curiosity. Ask about the emotions they identified. Help them connect specific life situations to specific emotions. Celebrate any nuance — this is more important than it sounds.', 25
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 4
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 26 (Week 4, Day 5)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 5, 'When Anger Shows Up',
       'Anger is the emotion most associated with divorced dads — and the one most likely to damage your relationships with your kids if it''s not handled. Not because anger is wrong, but because anger that isn''t metabolized gets expressed sideways.

Today you get honest about your anger. What are you angry about? What does it feel like in your body when it rises? What typically triggers it? What do you do when it shows up that you''re proud of — and what do you do that you''re not?

Anger properly metabolized becomes fuel. Anger unexamined becomes a weapon. You get to choose.',
       'What are the top three things you''re angry about right now? What is the healthy core need underneath each one?',
       'Create safety for anger to be expressed without judgment. Help the user move below the anger to the unmet needs beneath it (usually: fairness, respect, love, safety). Be steady and direct. Do not try to take the anger away — help them understand and channel it.', 26
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 4
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 27 (Week 4, Day 6)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 6, 'Holding Space for Your Kids',
       'Your kids are going through something too. They didn''t choose this divorce. They''re managing loyalty conflicts, new routines, big feelings they don''t have words for. Your ability to hold space for their experience — without needing to fix it, without getting defensive, without making it about you — is one of the most powerful things you can give them.

Today you practice holding space. In the next conversation you have with your kids, your only job is to listen and reflect. No solutions. No corrections. No "at least..." or "but you should..." Just: "Tell me more." "That sounds really hard." "I hear you."

The dad who can hold space for his kids'' pain is the dad they come to with everything.',
       'How does it feel when your kids express difficult emotions? What urge do you have to fix, explain, or shut it down? Where does that urge come from?',
       'Help the user practice the holding-space skill in the chat itself. Role-play a scenario if they''re willing. Ask what it''s like to hold space vs. to problem-solve. Connect this to their long-term vision of the relationship they want with their kids.', 27
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 4
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 28 (Week 4, Day 7)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 7, 'Week 4 Integration: Power Phase Graduation',
       'You have completed the Power phase. Four weeks. Twenty-eight days. You looked honestly at your life, met your inner child, built your daily structure, and began expanding your emotional capacity. You are not the same man who started Day 1.

Write a Power Phase summary: who you were when you started, what shifted, and who you''re becoming. Read it out loud. This is not about ego — this is about acknowledging the real work you''ve done.

Tomorrow you enter the Purpose phase, where the work becomes about building a life worthy of the man you''re becoming.',
       'What is the single biggest shift in you over the past four weeks? What are you most proud of?',
       'Celebrate fully. This is a real milestone. Help the user articulate the specific growth they''ve experienced. Look forward to Purpose phase with energy and momentum. This is a transition — honor it.', 28
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 4
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 29 (Week 5, Day 1)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 1, 'Your Body as Your First Asset',
       'Every business leader knows that their most important asset is themselves — their energy, focus, and longevity. As a divorced dad, you are the sole reliable constant for your children. If you collapse — physically, mentally, emotionally — everything collapses with you. Today you treat your body like the mission-critical asset it is.

Write a body audit: sleep quality, energy levels, diet quality, movement frequency, and any health issues you''ve been ignoring. What would a doctor who knew everything about your current life say to you? What have you been putting off that you know needs attention?

Taking care of your body is not selfish. It is a fatherhood responsibility.',
       'What is the one physical health habit that, if you implemented it consistently for 90 days, would have the biggest impact on your energy and presence?',
       'Be a health partner, not a trainer. Ask about current habits without judgment. Help the user prioritize — don''t try to fix everything at once. Identify the highest-leverage habit change and help them commit to it specifically. Be practical and encouraging.', 29
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 5
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 30 (Week 5, Day 2)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 2, 'Sleep Like a Champion',
       'Sleep deprivation is the single most underrated factor in divorced dad struggles. It impairs emotional regulation, increases cortisol, decreases testosterone, and makes you a fraction of the dad you can be. Today you treat sleep as a performance strategy.

Audit your current sleep: What time do you go to bed? What time do you wake up? What is the quality — do you wake up refreshed? What disrupts your sleep (co-parent texts, anxiety, alcohol, screens)? Then design your ideal sleep architecture: bedtime, wake time, room temperature, pre-sleep ritual, phone-out-of-bedroom rule.

You cannot outwork bad sleep. You cannot out-supplement, out-meditate, or out-coffee your way through chronic sleep deprivation.',
       'On your last great night of sleep — what did the day before look like? What can you replicate?',
       'Ask specifically about sleep challenges. If co-parenting anxiety is disrupting sleep, explore that. Help the user build a realistic sleep protocol. Be practical — this is one of the highest-ROI changes a struggling dad can make.', 30
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 5
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 31 (Week 5, Day 3)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 3, 'Nutrition for Warriors',
       'Divorce is often when a man''s nutrition falls apart. Eating alone, eating fast food, skipping meals, drinking more. Today you build a sustainable nutrition approach that supports your energy and emotional regulation — not perfection, but direction.

The foundation is simple: protein at every meal, vegetables once a day, water as your primary beverage, and alcohol in check. Not a diet — a default. When you''re overwhelmed, these defaults carry you. Write your nutrition defaults for breakfast, lunch, dinner, and snacks — things you can actually make or access in your real life.

Food is information. It tells your body whether it''s safe and resourced, or depleted and threatened. Feed yourself like your kids'' stability depends on it — because it does.',
       'What eating patterns from the divorce period are you most concerned about? What is the single most important nutrition habit you want to establish?',
       'Non-judgmental exploration of current eating. Help the user identify practical, sustainable changes — not a total overhaul. If alcohol is a concern, handle it with care and directness. Connect nutrition to energy and emotional availability for kids.', 31
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 5
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 32 (Week 5, Day 4)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 4, 'Testosterone, Vitality, and Fatherhood',
       'Testosterone levels in divorced men drop measurably — stress, poor sleep, poor nutrition, lack of movement, and emotional suppression all suppress it. Low testosterone doesn''t just affect the bedroom; it affects motivation, confidence, emotional resilience, and your sense of masculine identity.

Today you explore the lifestyle factors that support optimal testosterone: heavy resistance training, quality sleep, saturated fat in the diet, sun exposure, cold exposure, reduced chronic stress, and strong male social connection. You don''t need TRT if your fundamentals are in order — and even if you eventually need medical support, these fundamentals must come first.

A vital, energized dad is the dad your kids need. This is biology in service of fatherhood.',
       'On a scale of 1-10, how vital do you feel physically right now? What three lifestyle factors, if improved, would most restore your vitality?',
       'Handle sensitively — some men may feel shame about this topic. Normalize the biology while pointing to agency. Focus on lifestyle factors they can control. If they mention symptoms that suggest they should see a doctor, gently encourage that step.', 32
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 5
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 33 (Week 5, Day 5)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 5, 'The Body-Mind Connection',
       'Trauma, grief, and chronic stress live in the body — not just the mind. Research consistently shows that physical practices (exercise, breathwork, cold exposure, movement) are among the most effective interventions for emotional regulation and trauma processing. Today you explore this connection in your own body.

For the next 24 hours, track how your emotional state changes after physical activity. Notice what happens to your anxiety after a hard workout, your anger after a run, your sadness after an ice bath. Your body has built-in alchemy — you just have to use it.

The practices you''ve been building this program — movement, cold, breath — aren''t separate from your emotional healing. They are the healing.',
       'When have you used physical activity to process an emotion and noticed it shift? What physical practice most reliably changes your state?',
       'Help the user make explicit the connection they may have felt but not named between physical practices and emotional state. Explore their personal "state-change" toolkit. Reinforce that this is not just self-care — it''s a fatherhood tool.', 33
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 5
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 34 (Week 5, Day 6)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 6, 'Physical Goals That Matter',
       'Setting a meaningful physical goal does something that general "I should exercise more" goals cannot: it gives your discipline somewhere specific to go. Today you set a physical goal that is ambitious, measurable, and connected to your identity as a dad.

Not a weight goal — those are fragile and shame-driven. A performance goal: run a 5K, complete a 30-day cold exposure streak, do 20 pull-ups, complete a Spartan Race, hike a trail with your kids. Something that, when you accomplish it, makes you look at yourself differently.

Your kids need to see you pursue hard things. Not because you talk about it — but because they watch you do it.',
       'What physical goal, if you accomplished it in the next 90 days, would make you feel most proud and most like the man you''re becoming?',
       'Help the user identify a goal that is genuinely challenging but achievable. Ask what goal would make them proud — not what seems reasonable. Connect the goal to their kids watching them do hard things. Help them define the first step they can take this week.', 34
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 5
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 35 (Week 5, Day 7)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 7, 'Week 5 Integration: Your Body Blueprint',
       'This week you built your foundation for physical vitality. Not a fitness plan — a body blueprint that supports everything else in your life: sleep architecture, nutrition defaults, movement commitment, testosterone optimization, and a meaningful physical goal.

Review what you built. What is non-negotiable? What are you still avoiding? Where do you need accountability?

Write your Body Blueprint — one page that captures your commitments in each area. Post it somewhere you''ll see it daily.',
       'If you held your body blueprint for the next 90 days, what would be different about your life?',
       'Synthesize the week''s work. Help the user consolidate their commitments into clear, specific actions. Celebrate the week. Ask what accountability structure they need to sustain this. Be affirming and practical.', 35
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 5
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 36 (Week 6, Day 1)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 1, 'Who Are You Without Your Roles?',
       'You are a dad. An ex-husband. An employee or business owner. A son, a brother, a friend. But strip away every role — who is the person underneath? This is the most important question of Week 6, and most men haven''t thought about it since before they had kids.

Write a self-portrait that has nothing to do with your roles. What do you love? What do you believe? What would you do if no one was watching and nothing was required of you? What makes you come alive?

When you know who you are at the core — separate from your roles — you can show up to every role with more depth and authenticity.',
       'Who are you when no one is watching and nothing is required? What do you love about that person?',
       'Help the user explore their authentic self beneath their roles. If they can''t access it immediately, ask about childhood passions, things that make them lose track of time, what lights them up before the world gets hold of them. Be curious and unhurried.', 36
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 6
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 37 (Week 6, Day 2)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 2, 'Your Core Values',
       'Values are not aspirations — they are the principles you actually make decisions by, whether consciously or not. Today you identify your true core values and examine whether your life currently reflects them.

From a list of values (integrity, freedom, love, adventure, security, growth, creativity, service, justice, truth, connection, etc.), choose your top five. Not what you think you should value — what actually drives you. Then examine: do your daily choices reflect these values? Where is there conflict? Where is there alignment?

A values-aligned life feels different from one built on obligation and fear. This week you start closing the gap.',
       'What is the value you most clearly live? What is the value you most often compromise — and at what cost?',
       'Help the user identify their actual values through behavior evidence, not stated ideals. Ask clarifying questions: "What do your choices show you value, even when it''s uncomfortable?" Connect core values to their north star vision of fatherhood.', 37
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 6
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 38 (Week 6, Day 3)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 3, 'Authenticity in Fatherhood',
       'Your kids don''t need a perfect dad. They need a real one. Authenticity in fatherhood means showing your genuine self — including your struggle, your doubt, your process — in ways that are age-appropriate and psychologically safe for your kids.

Today you examine where you perform for your kids rather than connecting with them. Where are you "acting" like a dad instead of being one? Where do you pretend to have answers you don''t have? Where do you hide your real feelings to seem strong?

Kids can smell inauthenticity. They relax when they''re with someone real. Be the real one.',
       'Where do you feel most authentically yourself as a dad? Where do you feel most like you''re performing? What''s the difference?',
       'Explore the gap between performed and authentic fatherhood. Help the user identify specific moments where they could let down the performance. Normalize that authentic connection — including saying "I don''t know" — actually strengthens the relationship with kids.', 38
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 6
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 39 (Week 6, Day 4)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 4, 'The Masculine Identity',
       'Divorce challenges a man''s sense of identity in specific ways. Society has historically tied masculine worth to being a provider and protector of an intact family. When that structure breaks — through divorce, custody loss, or financial hardship — many men experience a profound identity crisis they don''t have language for.

Today you examine your masculine identity: what does it mean to be a man for you? Where did that definition come from? Is it serving you — or diminishing you? What would a more expansive, grounded masculine identity look like?

True masculine identity is not about what you have or what role you hold — it''s about who you are when everything is stripped away.',
       'Where has your masculine identity been most challenged by the divorce? What definition of masculinity do you want to model for your kids?',
       'Handle this with depth. Many divorced dads carry significant shame about identity. Help them examine where their masculine identity came from and whether it fits. Offer a wider definition rooted in character, presence, and love rather than status or control. Be grounded and real.', 39
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 6
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 40 (Week 6, Day 5)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 5, 'Spiritual Foundation (Non-Religious)',
       'Every human being has a relationship with something greater than themselves — whether they call it God, the universe, consciousness, nature, or simply meaning. This relationship is a resource. When you lose it, you lose the ability to make sense of suffering.

Today you examine your spiritual foundation — not as doctrine, but as a source of meaning, comfort, and perspective. What do you believe about why this is happening? What do you believe about who you are at the deepest level? What carries you when logic and willpower run out?

The divorced dads who come through the hardest seasons intact almost always have a source of transcendent meaning. You get to define what that is.',
       'What is your relationship with something greater than yourself? What belief about life and meaning has sustained you most in this season?',
       'Be completely inclusive of different spiritual backgrounds. Ask curious, open questions. If the user has no spiritual practice, explore what gives them meaning and transcendence — nature, art, legacy, community. Help them name it so they can deliberately access it.', 40
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 6
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 41 (Week 6, Day 6)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 6, 'Your Personal Philosophy',
       'A personal philosophy is a coherent, articulated set of beliefs about how life works and how to navigate it. The Stoics had theirs. The Buddhists have theirs. You''ve been building yours through this program — today you write it down.

In one to two pages, articulate your personal philosophy: what you believe about suffering, about growth, about fatherhood, about masculinity, about love, about what makes a life well-lived. Write it in your own voice, not in the voice of someone else''s framework.

This document will grow and change as you do. What matters is that you have one — so that when the world disassembles around you, you have a foundation to stand on.',
       'What is the single belief that has helped you most navigate this season? What belief is still causing you unnecessary suffering?',
       'Help the user articulate and refine their philosophy. Ask what they actually believe — not what they think they should believe. Help them find language for the wisdom they''ve earned through hard experience. Celebrate the coherence and authenticity of their worldview.', 41
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 6
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 42 (Week 6, Day 7)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 7, 'Week 6 Integration: Your Being Blueprint',
       'This week you returned to yourself beneath the roles. You examined your values, your authenticity, your masculine identity, your spiritual foundation, and your personal philosophy. You are more than your divorce, your custody arrangement, your job, and your pain.

Write your Being Blueprint: a one-page document that captures who you are at the core — your values, your philosophy, your authentic self. This is who you show up as. This is what your kids are inheriting.',
       'What do you now know about yourself that you didn''t fully acknowledge before this week?',
       'Synthesize the week. Help the user write or refine their Being Blueprint. Celebrate the depth of the work. Connect who they''ve discovered themselves to be with the dad they''re becoming. Be affirming and profound.', 42
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 6
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 43 (Week 7, Day 1)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 1, 'The Myth of Work-Life Balance',
       'Work-life balance is a lie — and believing it is making divorced dads miserable. There is no perfect equilibrium. There is only intentional prioritization, sustainable rhythms, and the ability to be fully present wherever you are. Today you release the myth and adopt a better framework.

Balance for a divorced dad looks like: deep focus on work when kids aren''t present, deep presence with kids when they are, protection of personal recovery time, and clear boundaries between each. It''s not equal — it''s intentional.

What would intentional prioritization look like in your actual custody schedule?',
       'Where do you feel most out of balance right now? Is the problem time, energy, or intention?',
       'Help the user replace the balance myth with a practical prioritization framework that fits their custody reality. Ask about their schedule — how many days with and without kids. Help them design different modes for different days. Be practical and liberating.', 43
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 7
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 44 (Week 7, Day 2)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 2, 'Priority Architecture',
       'Everything cannot be a priority. The word "priority" — etymologically — was singular until the twentieth century. Today you build a priority architecture: a clear, honest hierarchy of what matters most, so that when you have to choose, the choice is already made.

Your top priorities as a divorced dad might be: your kids'' wellbeing, your own foundation (health, stability, growth), your career/income, your relationships. Rank them. Then audit how your current time and energy actually distributes across these priorities. The gap between stated priorities and lived priorities is where most suffering lives.

Align your time with your values. Everything else is noise.',
       'What do your last seven days of choices show you are actually prioritizing? Is that what you want to be prioritizing?',
       'Help the user do an honest time audit and compare it to their stated priorities. Be direct if there''s a gap — but not harsh. Help them identify one concrete reallocation that would bring their time into better alignment with their priorities.', 44
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 7
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 45 (Week 7, Day 3)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 3, 'Managing Dad Time vs. Career',
       'For many divorced dads, the custody schedule creates natural division: career/self time when kids aren''t present, dad time when they are. But the guilt and anxiety cross both ways — you''re distracted at work when worrying about the kids, and distracted with the kids when worried about work.

Today you design clear containers: this is work time, this is dad time, this is recovery time. When you''re in a container, you''re fully in it. You can''t be a great dad and a great professional at the same time — but you can be great at each in its dedicated space.

Compartmentalization gets a bad reputation, but when it''s chosen rather than avoidant, it is a superpower.',
       'When are you most distracted from your kids by work worry — or most distracted from work by dad anxiety? What boundary would help most?',
       'Help the user create practical mental and logistical boundaries between dad time and career time. Ask about their custody schedule and work setup. Identify specific crossover moments where the boundary breaks down and help them design a fix.', 45
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 7
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 46 (Week 7, Day 4)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 4, 'Saying No Without Guilt',
       'Every yes is a no to something else. Every time you say yes to a commitment that doesn''t serve your priorities, you say no to your kids, your rest, or your growth. Today you practice the discipline of saying no — not from scarcity, but from clarity about what matters.

Identify three things in your current life that you are saying yes to out of obligation, guilt, or people-pleasing that are crowding out what matters most. Write them down. Then write what you could say or do to begin extricating yourself from those commitments.

Boundaries are not walls — they are the edges that define a life of intention.',
       'What are you saying yes to that you should be saying no to? What''s the fear underneath the inability to say no?',
       'Explore the patterns behind over-commitment. Help the user identify whether it''s guilt, fear of conflict, or identity. Help them practice specific no''s with language they can actually use. Connect boundary-setting to their ability to show up fully for what matters.', 46
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 7
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 47 (Week 7, Day 5)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 5, 'The Emotional Load of Divorce',
       'Divorce doesn''t just change your schedule — it adds an invisible emotional load that sits on top of everything else. The co-parent communication. The legal paperwork. The kids'' transitions. The logistics. The grief. The loneliness. It is an enormous weight that most men carry alone while trying to appear fine.

Today you name and measure your current emotional load. What are you managing emotionally that is invisible to most people? What are you not getting credit or support for — even from yourself?

You cannot manage a load you haven''t named. And you cannot get support for a struggle you haven''t acknowledged.',
       'What is the emotional labor of your divorce that is most invisible to others? What support would most help you carry it?',
       'Create space for the user to name the invisible work of divorced fatherhood. Validate without diminishing. Ask what support looks like — practical, emotional, or social. Help them identify one place they could ask for help this week.', 47
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 7
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 48 (Week 7, Day 6)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 6, 'Joy as a Non-Negotiable',
       'Joy is not a reward you earn when everything is going well. It is a nutrient your nervous system requires. Divorced dads who allow themselves no joy — who feel guilty enjoying anything while their family is in pain — burn out and become the empty shell their kids most need them not to be.

Today you give yourself permission to experience joy. Write a joy inventory: what brings you genuine delight? Not what should bring you joy — what actually does, even now? Schedule one of those things in the next 48 hours.

You can grieve and also laugh. You can be going through the hardest thing and still feel moments of real gladness. This is not denial — it is resilience.',
       'What brings you genuine joy? When did you last allow yourself to feel it without guilt?',
       'Normalize joy for men who are suffering. Help them name specific things that bring genuine delight — not general platitudes. If they resist ("I don''t deserve to feel good right now"), challenge that gently and directly. Help them schedule one joy practice this week.', 48
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 7
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 49 (Week 7, Day 7)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 7, 'Week 7 Integration: Your Balance Architecture',
       'Balance isn''t a destination — it''s a daily practice of prioritization, presence, and renewal. This week you replaced the myth of perfect balance with an architecture that actually fits your life as a divorced dad.

Review the pillars you built: your priority hierarchy, your dad-time and career-time containers, your no-saying practice, the emotional load you named, and your commitment to joy. Where are you most aligned? Where is the work still ahead?

Write your Balance Architecture — a simple one-page design for how you spend your time and energy going forward.',
       'What change in your daily balance would have the biggest impact on your wellbeing and your presence with your kids?',
       'Synthesize and celebrate. Help the user articulate their balance architecture clearly. Ask what accountability they need to sustain it. Affirm that progress over perfection is the standard. Be practical and encouraging.', 49
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 7
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 50 (Week 8, Day 1)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 1, 'Your Financial Reality Check',
       'Divorce is financially devastating for most men. Child support, legal fees, divided assets, maintaining two households — the numbers are brutal. Today you face yours without flinching.

Write your complete financial picture: monthly income, monthly expenses (including child support and legal), debt, savings, assets. Don''t estimate — get the actual numbers. Then calculate: what is your monthly surplus or deficit? What is your net worth?

Most men avoid this exercise because the numbers are frightening. But the fear of looking is always worse than the numbers themselves. You cannot build financial stability while refusing to look at your foundation.',
       'What financial reality have you been avoiding looking at? What would change if you faced it directly this week?',
       'Be a steady, non-judgmental presence for what can be a very difficult financial picture. Help the user get clear on their numbers. Do not offer specific financial advice — but help them see their situation clearly and identify the most urgent lever to pull.', 50
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 8
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 51 (Week 8, Day 2)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 2, 'Income as Love Language',
       'The money you earn is not separate from your role as a father — it is an expression of it. Financial provision is a form of love. When your income is stressed, your ability to provide experiences, stability, education, and resources for your kids is compromised. This is not about being a wallet — it''s about taking your provision seriously as a father.

Today you examine your relationship with income: is it enough? Is it growing? Is it stable? What is the gap between your current income and the income that would give your kids everything you want for them?

Financial ambition, when rooted in love for your kids, is a noble and powerful force.',
       'What income would give you and your kids the life you want them to have? What would have to change to reach it?',
       'Help the user connect financial ambition to fatherly love — removing shame from wanting more. Ask about income sources, stability, and growth trajectory. Help them identify the highest-leverage income action they could take in the next 30 days.', 51
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 8
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 52 (Week 8, Day 3)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 3, 'Building a Side Income Stream',
       'A single income source is fragile — especially for a divorced dad with fixed financial obligations. Today you explore the potential of a second income stream: not to get rich quick, but to build antifragility into your financial life.

Consider your skills, expertise, and assets. What could you offer that someone would pay for? Consulting in your industry? A service based on a hobby? A digital product? What would a $500/month side income require from you in time and effort — and what could it mean for your financial flexibility as a dad?

Extra income buys choices. Choices buy presence. Presence is the gift your kids most need.',
       'What skill or knowledge do you have that someone else would pay for? What has stopped you from monetizing it?',
       'Help the user brainstorm realistic side income options based on their existing skills. Be concrete and specific — don''t let it stay abstract. Help them identify one option worth exploring and define the first step. Enthusiasm and practicality in equal measure.', 52
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 8
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 53 (Week 8, Day 4)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 4, 'The Child Support Mindset Shift',
       'For many divorced dads, child support payments feel like extraction — money taken under legal compulsion, often with resentment attached. That resentment is understandable. It is also destroying your peace.

Today you attempt a mindset shift: what if you decided to see child support not as something taken from you, but as your contribution to your children''s stability — something you''re choosing to give, regardless of how it''s administered? This is not about excusing injustice in the system. It''s about reclaiming your agency over how you relate to the money.

You can''t control the amount. You can control the meaning you give it.',
       'What emotion do you carry around child support? What would shift if you consciously chose to see it as your investment in your kids?',
       'Handle with great care — this is a charged topic. Don''t minimize genuine injustice. But help the user explore what the resentment costs them in energy and peace, and whether a different relationship to the payment is possible. Be honest and compassionate.', 53
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 8
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 54 (Week 8, Day 5)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 5, 'Long-Term Wealth for Your Kids',
       'One of the greatest gifts you can give your children is not just financial stability now, but the foundation for generational wealth. Even modest steps — started early and sustained — compound into something meaningful.

Today you explore three tools: (1) a custodial investment account (UTMA) in each child''s name, even if starting with small amounts, (2) life insurance to protect them if something happens to you, and (3) a simple estate document naming a guardian and beneficiary. You don''t need to be wealthy to do these things — you need to be intentional.

Building for your kids'' future is an act of love they may not understand for decades. Do it anyway.',
       'What have you done to build financial security for your children''s future? What is one step you could take in the next 30 days?',
       'This is aspirational but practical. Help the user identify the first accessible step (many custodial accounts can be opened with $50). Ask if they have life insurance and a basic will — if not, encourage them to get these done. Be encouraging and action-oriented.', 54
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 8
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 55 (Week 8, Day 6)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 6, 'Your Career or Business Vision',
       'Where is your career or business going? If you''re being honest — not where it is, but where you want it to go in the next three to five years? Many divorced dads are in survival mode, just trying to keep income stable. Today you lift your eyes to the horizon.

Write your career or business vision: the role, impact, income, and lifestyle you want to build. Then identify: what is the gap between where you are and where you''re going? What is the single most important move you could make in the next 90 days to close that gap?

Ambition for your kids'' sake is a different kind of ambition. It burns cleaner and lasts longer.',
       'Five years from now, what does your career or business look like if things go well? What would you regret not having pursued?',
       'Help the user think big about their professional future without dismissing current constraints. Ask about their ambitions, their skills, the opportunities they see but haven''t pursued. Help them identify one high-leverage professional move to make in the next 90 days. Be energizing.', 55
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 8
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 56 (Week 8, Day 7)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 7, 'Week 8 Integration: Your Financial Blueprint',
       'Financial clarity is one of the most stabilizing gifts you can give yourself and your children. This week you faced your numbers, examined your income, explored growth options, made peace with obligations, and looked toward the future.

Write your Financial Blueprint: current reality, 90-day targets, 1-year vision, and the two or three commitments that will get you there. Keep it simple enough to actually follow.

Money in the service of fatherhood is one of the highest uses of masculine energy.',
       'What is the most important financial commitment you''re making coming out of this week? What will be different about your financial life in 90 days?',
       'Consolidate the week. Help the user write a clear, simple financial blueprint. Celebrate that they engaged with this honestly. Ask what accountability they need. Look forward with energy.', 56
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 8
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 57 (Week 9, Day 1)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 1, 'What Are You Protecting?',
       'The instinct to protect is one of the deepest masculine drives — but most divorced dads direct it outward (toward their kids) while neglecting it entirely inward (toward themselves). Today you audit what in your life most needs protection right now.

List the five things most worth protecting in your current life: your relationship with your kids, your mental health, your financial stability, your integrity, your peace. Then audit: what is currently threatening each one? Which threat is most urgent?

You can''t protect anything external if your internal foundation is crumbling. Self-protection is not selfishness — it is the precondition for everything else.',
       'What is the biggest threat to your wellbeing right now? What have you been ignoring that needs protection?',
       'Help the user name what is actually under threat. Some will immediately go to external threats (co-parent, legal, financial). Gently redirect to internal threats as well. Help them see that self-protection is a fatherhood imperative, not a luxury.', 57
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 9
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 58 (Week 9, Day 2)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 2, 'Your Emotional Immune System',
       'Just as your body has a physical immune system that defends against pathogens, you have an emotional immune system that defends against toxic inputs: chronic negativity, drama, manipulation, gaslighting, and environments that deplete rather than restore you.

Today you assess the state of your emotional immune system. Where is it strong — and where are the gaps? What environments, interactions, or habits are compromising it? What practices strengthen it?

A compromised emotional immune system makes you reactive, exhausted, and unavailable. Your kids need you immunologically strong.',
       'What in your current life is most consistently depleting your emotional immune system? What one change would most strengthen it?',
       'Help the user identify specific depleters and strengtheners. This is practical: screen time, toxic relationships, alcohol, rumination, negative news. Help them prioritize one depletion to reduce and one strengthener to increase. Be specific and tactical.', 58
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 9
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 59 (Week 9, Day 3)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 3, 'Toxic People and Energy Vampires',
       'Not everyone in your life belongs in your next chapter. Some people in your world are actively draining your energy — through drama, negativity, manipulation, or simply requiring more than they give. Today you audit your social ecosystem with clear eyes.

For each significant relationship in your life, ask: does this person add energy or drain it? Do they support your growth or resist it? Do they bring out your best or your worst? Some relationships must be maintained despite the cost (co-parent, certain family members). But many can be quietly reduced.

You become who you spend time with. Choose accordingly.',
       'Who in your current life most consistently drains your energy? What would it look like to reduce that exposure without creating unnecessary conflict?',
       'Handle carefully — if the co-parent or family members are the primary energy drains, help the user strategize distance without escalation. Help them identify one relationship to invest more in and one to quietly create more distance from. Be practical and strategic.', 59
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 9
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 60 (Week 9, Day 4)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 4, 'The Co-Parenting Boundary',
       'The co-parenting relationship is simultaneously one of the most important and most difficult relationships in a divorced dad''s life. You must maintain enough connection to parent effectively — and enough distance to protect your sanity. Today you design your co-parenting boundary.

A healthy co-parenting boundary includes: communication method and cadence (text only? set times?), topics that are in-scope (the kids) and out-of-scope (your personal life), a response time expectation that reduces urgency anxiety, and a protocol for when things escalate.

The boundary is not about punishment or war — it''s about creating a sustainable, businesslike relationship that keeps the kids insulated from conflict.',
       'Where does your co-parenting communication currently cross into territory that is draining, toxic, or counterproductive? What boundary would most improve your peace?',
       'Be practical and strategic here. Help the user design specific, implementable co-parenting communication boundaries. If there is high conflict, reference parallel parenting (treating it like a business transaction). The goal is the kids'' wellbeing and the dad''s sanity — in that order.', 60
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 9
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 61 (Week 9, Day 5)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 5, 'Social Media and Your Sanity',
       'For divorced dads, social media is particularly dangerous: seeing the co-parent''s posts, tracking her life, comparing your situation to others'' curated highlights. It is a machine designed to capture attention — and in the context of divorce, it can actively feed rumination, comparison, and anxiety.

Today you design your social media boundaries: what platforms serve you, which don''t, and what rules govern your use. Consider unfollowing or muting the co-parent if seeing her posts disrupts your peace. Consider time limits. Consider a complete fast for 30 days to reset your relationship with it.

Your peace is worth more than the dopamine hit of staying connected to everyone else''s highlight reel.',
       'How does your current social media use affect your emotional state? What would you lose — and gain — from a 30-day fast?',
       'Help the user examine their specific social media habits without judgment. Ask which platforms and which usage patterns most disrupt peace. Challenge them to consider a period of reduction or fasting. Connect phone/social boundaries to their capacity for presence with kids.', 61
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 9
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 62 (Week 9, Day 6)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 6, 'Building Your Inner Circle',
       'Every man needs a core group of other men who know his real story and will call him higher. Not drinking buddies. Not yes-men. Men who are doing hard things themselves, who can tell you the truth with love, and who won''t let you self-destruct or give up.

Today you honestly assess your current male friendships. Do you have men in your life who know you deeply? Who you could call at 2 AM? Who are growing and pushing you? If not, this is the work: finding or building brotherhood.

Where you find it — through church, through program communities, through groups, through old friendships you''ve let drift — matters less than that you find it.',
       'Who are the men in your life who know your real story? What would it take to build the kind of brotherhood that would actually sustain you?',
       'Help the user audit their male friendships with honesty. If they''re isolated — which many divorced dads are — normalize it and help them identify one place to begin building connection. Ask what kind of brother they want to be as well as what they need. Be direct and encouraging.', 62
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 9
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 63 (Week 9, Day 7)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 7, 'Week 9 Integration: Your Protection System',
       'This week you built your protection system — the practices, boundaries, and relationships that keep you resourced and available for your kids. This isn''t about building walls. It''s about building a sustainable life from which you can be a great dad.

Review what you''ve put in place: emotional immune system habits, relationships you''ve audited, co-parenting boundaries, social media boundaries, and progress toward brotherhood. What is most urgent to implement?

Write your Week 9 Declaration. One sentence per protection: this is what I''m protecting and this is how.',
       'What protection that you''ve been avoiding this week do you most need to put in place right now?',
       'Synthesize and challenge. The Protection phase is about making real decisions, not just awareness. Help the user name the one protection they''ve been most reluctant to put in place — and help them commit to it. Be direct and affirming.', 63
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 9
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 64 (Week 10, Day 1)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 1, 'The Children''s Bill of Rights in Divorce',
       'Your kids have rights in this divorce — not legal rights only, but developmental rights. They have the right to love both parents without guilt. The right to not be a messenger. The right to not hear adult problems. The right to cry without being told it''s okay. The right to remain children.

Today you write your children''s bill of rights — the commitments you''re making to protect their childhood experience of this divorce. Be specific. These commitments are your standard, and you will return to them when you''re tempted to use your kids as allies, information sources, or emotional support.

They didn''t choose this. You are their shield.',
       'Where have you, even unintentionally, exposed your kids to adult dynamics in this divorce? What commitment are you making to protect them more fully?',
       'Be non-judgmental — nearly every divorced parent has done some version of what this task addresses. Help the user identify specific behaviors to change, not just awareness. The children''s bill of rights they write should be specific and actionable. Be warm but firm.', 64
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 10
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 65 (Week 10, Day 2)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 2, 'What Your Kids Need to Hear',
       'Your kids need to hear specific things from you — not just "I love you," though that matters. They need to hear: that the divorce is not their fault. That both their parents love them. That they are safe and will always have a home with you. That their feelings are okay. That you will keep showing up.

Today you have — or plan — a conversation with your kids that delivers these messages in age-appropriate language. You don''t need to have all the answers. You need to be honest about what you know: that you love them, that you''re here, that everything will be okay.

What your kids most fear is that your love is contingent and that they might lose you. Tell them they won''t.',
       'What does each of your children most need to hear from you right now? When will you tell them?',
       'Help the user prepare for this conversation if they haven''t had it, or process it if they have. Ask about each child''s age, personality, and what they seem most anxious about. Help the user find the right words. This is one of the most important tasks in the program.', 65
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 10
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 66 (Week 10, Day 3)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 3, 'Age-Appropriate Conversations',
       'Different ages need different conversations about divorce. A four-year-old needs simple, concrete reassurance ("Daddy has his house and Mommy has her house. You have both."). A ten-year-old might need to talk about the logistics and have their feelings validated. A teenager might need you to hold space for their anger without defending yourself.

Today you learn the developmental needs of your children''s specific age group and adapt your communication accordingly. There is no one-size-fits-all script — only what your particular child, at their particular age, needs from their particular dad.

Meet them where they are.',
       'What does each of your children, at their current age, most need from you in terms of how you talk about the divorce and what you make sure they know?',
       'Ask for the ages of the user''s children. Offer specific, age-appropriate communication guidance for each. If they have teenagers, prepare them for the anger and resistance. Help them see their role as the steady anchor regardless of how the kids respond.', 66
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 10
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 67 (Week 10, Day 4)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 4, 'Not Making Kids Choose',
       'One of the most damaging things a divorced parent can do is put their children in a loyalty conflict — even subtly. Sighing when they mention the other parent. Asking probing questions about what happens at Mom''s house. Sending messages through the kids. Competing for their affection.

Today you examine, with radical honesty, whether you''re creating any loyalty conflicts for your kids — intentionally or not. Write down specific behaviors you''re committed to stopping and specific behaviors you''re committed to modeling: supporting their relationship with their other parent, never speaking negatively about her in their presence, celebrating the love they have for both parents.

Your kids'' emotional health requires both parents to be safe to love.',
       'Have you, even subtly, made your kids feel they need to choose? What specific commitment are you making today to protect their ability to love both parents?',
       'This requires honesty the user may resist. Be gentle but clear: loyalty conflicts cause lasting psychological harm. Help them identify specific behaviors to change. If there is legitimate safety concern about the other parent, acknowledge that nuance — but distinguish safety concerns from loyalty competition.', 67
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 10
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 68 (Week 10, Day 5)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 5, 'The Consistent Dad',
       'In the research on children of divorce, the factor that most predicts long-term wellbeing is not the presence of conflict but the presence of at least one stable, consistent, engaged parent. That parent can be you.

Consistency means: showing up when you said you would. Maintaining the same rules and the same love from visit to visit. Not being the Disneyland Dad (all fun, no structure) and not being the Ghost Dad (absent or distracted). Being reliably, predictably present.

Your kids can handle a lot when they can count on you. They need to be able to count on you.',
       'On a scale of 1-10, how consistent are you as a presence in your kids'' lives right now? What is one thing you could do to increase that number?',
       'Help the user think about consistency honestly. Ask about their custody schedule and what their presence looks like on their days. Challenge them to identify one specific way to be more reliably present. Be affirming of what they''re already doing well.', 68
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 10
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 69 (Week 10, Day 6)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 6, 'Building Their Resilience',
       'Your kids are going through something hard. That is true and it matters. It is also true that hardship, when supported by a present and loving parent, builds resilience. Your job is not to prevent them from experiencing hard things — it is to be the safe harbor they return to after.

Today you think about how you can actively build your kids'' resilience: by modeling resilience yourself, by letting them experience age-appropriate challenges without rescuing them immediately, by validating their struggle while expressing confidence in their capacity, and by telling them stories of people (including yourself) who overcame hard things.

You are raising people who will face a hard world. Give them what they need.',
       'What qualities of resilience do you most want your kids to develop? How are you modeling those qualities right now?',
       'Help the user think about resilience-building in practical terms. Ask about their kids'' responses to challenge. Discuss how modeling resilience (which they''re actively doing in this program) is one of the most powerful things they can offer their children. Be affirming and inspiring.', 69
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 10
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 70 (Week 10, Day 7)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 7, 'Week 10 Integration: Your Kids'' Shield',
       'This week you sharpened your capacity to protect your children from the worst effects of divorce — not by pretending it''s fine, but by being intentional about what you expose them to and what you shelter them from.

Review your commitments: the children''s bill of rights, the conversations you''ve had or planned, the loyalty conflicts you''re eliminating, the consistency you''re building, and the resilience you''re modeling. What still needs action?

Write your Week 10 Declaration: I am my children''s shield and here is what that means.',
       'If your kids could describe you as a dad at the end of this year, what do you most want them to say?',
       'Bring Week 10 to a meaningful close. The question about what the kids would say is powerful — help the user stay with it and then connect the answer to specific choices. This is some of the most meaningful work in the program. Honor it.', 70
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 10
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 71 (Week 11, Day 1)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 1, 'Your Legal Team Assessment',
       'Many divorced dads have inadequate legal representation — either no attorney, an overworked one, or one who doesn''t specialize in family law. Today you honestly assess your legal situation and whether you have the right support.

If you''re still in active legal proceedings: do you have an attorney who is fighting for your parental rights? Do you understand your agreement fully? Are there provisions you need to enforce or modify?

If proceedings are complete: do you have a copy of your decree? Do you understand every provision? What would you do if the other parent violated the agreement?

Knowing your legal position is not paranoia — it is protection.',
       'What aspect of your legal situation are you most uncertain or anxious about? What information do you most need?',
       'Be supportive but clear that legal issues require legal professionals. Help the user identify the most pressing legal question or concern. Encourage them to consult with a family law attorney if they haven''t recently. Help them articulate what they need to know.', 71
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 11
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 72 (Week 11, Day 2)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 2, 'Documenting Everything',
       'In co-parenting disputes, documentation is often the difference between winning and losing. Documented communication, documented visitation, documented expenses — these create a record that cannot be argued with and that protects you if things escalate.

Today you implement a documentation system: use a dedicated email address or app (apps like TalkingParents or OurFamilyWizard create timestamped, unalterable records) for co-parent communication. Keep a journal of parenting time, incidents, and significant conversations. Save every receipt related to child expenses.

This is not about building a case. It is about protecting yourself from a case being built against you.',
       'How well-documented is your co-parenting situation right now? What would be your vulnerability if a dispute arose tomorrow?',
       'Help the user set up practical documentation habits. Recommend specific tools (co-parenting communication apps). Emphasize that this is protective, not adversarial. Ask what specific documentation gaps they have and help them close the most important one first.', 72
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 11
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 73 (Week 11, Day 3)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 3, 'The Custody Agreement Deep-Dive',
       'Most divorced dads signed a custody agreement under stress, during an emotionally overwhelming process, and may not fully understand what they agreed to. Today you read your custody agreement — all of it — with fresh eyes.

Highlight provisions you don''t understand and get them explained. Note provisions the other party is not following. Note provisions that may no longer fit your circumstances (if your schedule has changed, if the kids'' needs have changed). Note what would trigger a modification request.

You agreed to this document. You need to know it.',
       'What provision in your custody agreement are you most uncertain about? What would you most want to change and under what circumstances could you pursue that change?',
       'Encourage this review seriously. Ask if they have questions about specific provisions. If modifications seem appropriate, note that this requires legal counsel and typically requires showing a material change in circumstances. Be practical and empowering — knowledge is protection.', 73
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 11
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 74 (Week 11, Day 4)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 4, 'Financial Separation Best Practices',
       'Financial entanglement after divorce is a source of ongoing conflict and legal vulnerability. Today you assess the state of your financial separation and take steps to complete it.

Areas to examine: joint accounts fully separated, name removed from joint debts (not just responsibility transferred — actually removed), credit report checked for accounts you didn''t know about, tax filing status updated, beneficiaries updated on all policies and retirement accounts.

Financial separation is not just accounting — it is legal protection.',
       'Are there financial entanglements from the marriage that you have not fully resolved? What is the most urgent one to address?',
       'Help the user create a financial separation checklist and identify what is still unresolved. Be practical and specific. For complex situations, encourage consultation with a financial advisor or attorney. This task can surface significant anxiety — hold it steadily.', 74
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 11
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 75 (Week 11, Day 5)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 5, 'Building Your Credit Independently',
       'Divorce often damages credit: joint accounts closed, payment history disrupted, new debt taken on. Today you assess your individual credit and build a plan to restore and strengthen it.

Check your credit score (free via Credit Karma or Experian). Identify any negative items and whether they can be disputed. Ensure you have accounts in your name only that you''re paying on time. Consider a secured card if your credit needs rebuilding. Set a 12-month credit score target.

Good credit is freedom. It is the ability to rent an apartment, buy a car, eventually buy a home. For your kids, it is their dad having options.',
       'What is your current credit situation? What is the single most important credit action you can take in the next 30 days?',
       'Help the user get specific about their credit situation. If they don''t know their credit score, encourage them to check it today. Help them identify one actionable credit improvement step. Connect credit health to their ability to provide stability for their kids.', 75
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 11
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 76 (Week 11, Day 6)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 6, 'Estate Planning as a Dad',
       'If you died tomorrow, what would happen to your kids? Who would care for them? Who would manage any money you left? These questions are uncomfortable, which is why most dads avoid them — until it''s too late.

Every divorced dad needs: (1) a will naming a guardian for minor children and distributing assets, (2) a beneficiary designation on all accounts (often updated — your ex is likely still listed), (3) life insurance sufficient to support your kids through adulthood if you''re gone, (4) a healthcare proxy and durable power of attorney.

This is a profound act of love. Do it.',
       'If you died tomorrow, are your kids protected? What specific estate planning step is most urgent for you to take?',
       'Be direct about the importance of this without being morbid. Many people will need to update beneficiaries immediately — this is urgent. Life insurance for divorced dads with dependents is a non-negotiable. Help them identify the first step — often just calling their HR department or an estate attorney.', 76
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 11
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 77 (Week 11, Day 7)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 7, 'Week 11 Integration: Your Asset Protection Plan',
       'This week you protected your legal and financial foundation — not because you''re paranoid or adversarial, but because your kids'' stability depends on yours. A dad who is legally and financially exposed cannot provide the security his children need.

Review your progress: legal team, documentation system, custody agreement understanding, financial separation, credit plan, and estate documents. What is most urgent? What will you complete in the next 30 days?

Write your Asset Protection Plan — a simple checklist with deadlines.',
       'What legal or financial protection have you been putting off that you most need to address? What would it cost you to ignore it another six months?',
       'Synthesize the week and hold the user accountable to specific action. Asset protection is a love language — help them feel the urgency as love for their kids, not fear. Challenge them to commit to one specific action this week.', 77
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 11
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 78 (Week 12, Day 1)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 1, 'The Drama Detox',
       'Drama is a choice — even when it doesn''t feel like one. The conflict you engage with, the arguments you take the bait on, the chaos you allow into your environment — these are choices. Today you commit to a drama detox.

Audit every source of drama in your life over the past 30 days: co-parent conflicts that escalated beyond necessity, social media arguments, family friction, friend group gossip. For each one, ask: did engaging serve my kids? Did it serve my peace? What would disengagement have cost?

Drama taxes your nervous system. Every unit of energy you spend on drama is a unit not spent on your kids or your growth.',
       'What source of drama in your life is costing you the most? What would it look like to disengage from it entirely?',
       'Help the user identify their biggest drama sources with specificity. Some will be systemic (a high-conflict co-parent). For those, parallel parenting and documentation are the tools. For others, it''s a choice. Help them commit to one specific disengagement. Be practical.', 78
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 12
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 79 (Week 12, Day 2)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 2, 'Mindfulness for Dads',
       'Mindfulness is not meditation retreats and incense. For a divorced dad, mindfulness is the practical ability to be present in this moment, with these kids, in this life — without being hijacked by rumination about the past or anxiety about the future.

Today you start a simple mindfulness practice: two minutes of intentional breathing before your kids'' transitions (pickup from school, start of your parenting time). Notice what thoughts arise. Let them pass. Return to your breath. Arrive fully.

Your kids don''t need a dad who has no problems. They need a dad who is present despite having them.',
       'When are you most likely to be physically present but mentally absent with your kids? What triggers that absence?',
       'Help the user identify specific transition moments where mindfulness would help most. Teach a simple practice they can use — even 60 seconds of deliberate breathing before entering the house. Connect presence to the quality of time with kids, not quantity. Make it practical.', 79
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 12
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 80 (Week 12, Day 3)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 3, 'When She Pushes Your Buttons',
       'The co-parent is, for most divorced dads, the person who can most reliably destroy their peace in an instant. A text. A tone. A demand. And suddenly you''re reactive, angry, or crushed — and your kids are watching.

Today you map your triggers and design your responses. What specifically does she do or say that most disrupts you? What does it awaken in you (fear? rage? shame? grief?)? And what can you put between stimulus and response — a protocol, a practice, a pause?

Viktor Frankl: between stimulus and response there is a space. In that space lies your freedom. That space is what we''re building.',
       'What is the co-parent''s most reliable trigger for you? What does it awaken in you, and what would a regulated response look like?',
       'This is tactical and important. Help the user map their trigger-response pattern precisely. Then help them design an interrupt: a pause, a physical practice, a rule (never respond to a difficult text immediately). The goal is 24 hours of practice, not perfection. Be practical and direct.', 80
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 12
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 81 (Week 12, Day 4)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 4, 'Your Nervous System Regulation Toolkit',
       'You''ve been building regulation tools throughout this program — breathwork, movement, cold exposure, mindfulness. Today you consolidate them into a personal toolkit: a menu of go-to practices for different emotional states.

For acute stress or anger: box breathing or cold water on face. For sustained anxiety: vigorous movement. For grief or sadness: writing or calling a member of your inner circle. For disconnection or numbness: nature walk or breathwork. For overwhelm: a ten-minute brain dump in a journal.

Having a toolkit means you''re not improvising in crisis. You know what to reach for.',
       'Which regulation practice has worked best for you in this program? When do you most need it but most forget to use it?',
       'Help the user build their personal regulation toolkit based on what they''ve experienced in this program. Ask which practices have actually worked. Help them design a simple reference: state > tool. Encourage them to screenshot it and save it.', 81
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 12
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 82 (Week 12, Day 5)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 5, 'Forgiveness as Freedom',
       'Forgiveness is not a gift you give the other person. It is a gift you give yourself. Carrying unforgiveness is like drinking poison and waiting for the other person to die. It corrodes your peace, depletes your energy, and keeps you trapped in the past.

Today you examine what you''re not forgiving: the ex-wife, yourself, the lawyer, the judge, the friends who disappeared. Not to excuse what happened — but to release yourself from the grip of it. Forgiveness does not mean reconciliation. It means freedom.

For your kids'' sake, you need to be free.',
       'What are you most struggling to forgive — yourself or someone else? What would freedom from that unforgiveness feel like?',
       'Handle with great care — forgiveness is deeply personal and often complex. Do not push premature forgiveness. But help the user see what carrying unforgiveness is costing them. Explore what forgiveness could mean without requiring trust, reconciliation, or the absence of accountability.', 82
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 12
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 83 (Week 12, Day 6)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 6, 'Gratitude Under Pressure',
       'Gratitude in comfortable circumstances is pleasant. Gratitude under pressure is transformative — it literally shifts the neurochemistry of the brain away from threat response toward resourcefulness and connection.

Today you practice structured gratitude: five things you''re grateful for about your life right now, including at least one thing directly about this difficult season (what it''s teaching you, what it''s revealing, who it''s making you). This is not toxic positivity. It is the practice of finding what is still true and good when the easy things have been taken.

Some of the most grateful people alive have lost the most. Gratitude is a practice, not a feeling.',
       'What five things are you genuinely grateful for today? What has this hard season given you that you wouldn''t have gotten any other way?',
       'Help the user find genuine gratitude — not forced positivity. Ask what they''ve learned, who they''ve become, what they''ve discovered about themselves through this season. Help them see gains within the loss. This is powerful when done authentically.', 83
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 12
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 84 (Week 12, Day 7)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 7, 'Week 12 Integration: Protection Phase Graduation',
       'You have completed the Protection Phase. Three months in, you are protecting yourself, your kids, your assets, and your peace with intention and skill. You are not the reactive, overwhelmed man who may have started this program.

Write your Protection Phase summary: what you''ve built, what you''ve released, what you''ve committed to. Then write your Protection Phase Declaration — I protect myself so I can protect my children.

Tomorrow you enter the Profit Phase. This is where everything you''ve built begins to compound.',
       'What is the single most important thing the Protection Phase gave you? What are you most proud of from the past month?',
       'Celebrate this milestone fully. Help the user see how far they''ve come and what they''ve built over three phases. The Profit phase ahead is expansive and generative — create momentum and excitement for what''s coming. Be genuinely celebratory.', 84
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 12
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 85 (Week 13, Day 1)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 1, 'Friendships After Divorce',
       'Divorce is a social earthquake. Mutual friends choose sides. Some friendships simply don''t survive the transition. The social world that was built around a couple dissolves. Today you take stock of your current friendships and begin intentionally building the social architecture of your new life.

Who are the friends that survived the divorce intact — and are they the right people to accompany you into your next chapter? Where are the friendships you want to build or deepen? What would it take to initiate?

Men are notoriously bad at initiating friendship. That means the man who does it is rare — and valued.',
       'Who are the two or three friends most important to your next chapter? What would you need to invest in those friendships to deepen them?',
       'Help the user think practically about friendship-building. If they''re isolated, help them identify one specific place or community to find new connection. If they have existing friendships to deepen, help them plan one concrete step. Male friendship is often built in parallel activity — ask what they could do together.', 85
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 13
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 86 (Week 13, Day 2)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 2, 'Dating When You''re a Dad',
       'At some point — when you''re ready and not before — you will re-enter the dating world. Today you think through the principles and practical realities of dating as a divorced dad, so that when the time comes you''re making conscious choices rather than reactive ones.

Key considerations: your kids come first — new partners are not introduced to kids quickly. Heal before you heal with someone else — bringing unprocessed grief into a new relationship exports your pain onto another person. Know what you want — not just as a partner, but as a family architect. The person you choose next will have significant influence on your children''s lives.

Date with intention. Your future family starts with the clarity you bring to this.',
       'Where are you in your readiness to date? What do you know about what you want in a future partner — and what do you know you can''t tolerate?',
       'Meet the user where they are on the dating readiness spectrum without judgment. If they''re already dating, help them think through the kid-introduction question specifically. If not ready, validate that — and help them think about what readiness would look like. Be thoughtful and practical.', 86
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 13
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 87 (Week 13, Day 3)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 3, 'Your Relationship With Your Kids',
       'After three months of this program, your relationship with your kids has likely already shifted. Today you examine it directly: what is the quality of your connection right now? What are they bringing to you? What are you bringing to them?

Plan a meaningful experience with each child — one-on-one. Not a grand gesture; something real. An activity they love, undistracted time, and a conversation that goes below the surface: how are you, really? What''s hard? What''s good? Listen more than you talk.

Your relationship with your kids is the most important relationship of your life. Water it deliberately.',
       'If you asked each of your kids today how they feel about their relationship with you, what do you think they would honestly say?',
       'Help the user plan the one-on-one experiences. Ask about each child''s specific interests and what a meaningful experience looks like for them. Help the user prepare for the "how are you really" conversation. This is practice for a lifetime of connected fathering.', 87
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 13
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 88 (Week 13, Day 4)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 4, 'Male Mentors and Brotherhood',
       'Every man needs two kinds of relationships he often doesn''t have: mentors (men who are further along than him, who can see what he can''t) and brothers (peers who are in the fight alongside him). Today you pursue both.

Identify one man who is five to ten years ahead of you — in fatherhood, in career, in character — who you would want to learn from. Reach out this week. Not with a formal mentorship ask — just a coffee, a question, a genuine expression of admiration.

Also identify the men you want in your inner circle as brothers — men who are doing the same work you are. Where do you find them? Often in the same rooms you''re entering.',
       'Who is the mentor figure in your life you most admire? What would it take to initiate a relationship with him?',
       'Help the user identify specific mentor candidates. Help them craft the outreach — what to say, what to ask. Normalize that men rarely get asked and are often honored when they are. Also help them identify brotherhood sources: men''s groups, faith communities, programs like this one.', 88
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 13
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 89 (Week 13, Day 5)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 5, 'The Co-Parenting Relationship (Long Game)',
       'You will be co-parenting with this woman for the rest of your children''s childhood and potentially beyond — graduations, weddings, grandchildren. The quality of your long-game co-parenting relationship will shape your children''s experience of family for decades.

Today you think about the long game. What kind of co-parenting relationship do you want to have in five years? What would it take — from you, specifically, regardless of what she does — to move toward that? Where is the low-hanging fruit: one thing you could do or stop doing that would reduce conflict for your kids?

This is the longest relationship you''ll have in your post-divorce life. Treat it with long-game strategy.',
       'What kind of co-parenting relationship do you want at your kids'' graduations? What would it take to build it from here?',
       'The long-game reframe is powerful for men stuck in short-term conflict. Help the user see the graduation moment vividly and work backward: what would it take to get there? Identify one specific change they could make. Be strategic and forward-looking.', 89
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 13
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 90 (Week 13, Day 6)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 6, 'Family Integration',
       'At some point your kids will have step-relationships, blended family dynamics, and new adults in their lives. Today you think about how you will navigate family integration: new partners, her new partner, extended family, your kids'' need for stability and clarity.

The principle: your kids'' emotional security is the north star. New partners are introduced slowly and carefully. Extended family is reminded to never speak negatively about the other parent. You create a culture in your home that is warm, boundaried, and clear.

Your home is a sanctuary. You design its culture.',
       'What principles do you want to govern how you integrate new relationships and people into your children''s lives?',
       'Help the user articulate their family integration principles before they need them. If they''re already navigating this (her new partner, their own new relationship), help them think through the specific situation. Be thoughtful, child-centered, and practical.', 90
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 13
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 91 (Week 13, Day 7)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 7, 'Week 13 Integration: Your Relationship Blueprint',
       'This week you surveyed the relationship landscape of your post-divorce life: friendships, dating, your kids, mentors, co-parenting, and family integration. Relationships are the medium through which everything meaningful in life happens.

Write your Relationship Blueprint: the relationships you''re investing in, the principles you''re using to build them, and the person you''re becoming in relationship to others.',
       'What is the relationship that most needs your deliberate investment right now? What is one thing you could do this week?',
       'Synthesize the week. Help the user prioritize — they can''t invest deeply in all relationships simultaneously. Help them identify the one or two highest-priority relationships and one concrete action for each. Be warm and affirming.', 91
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 13
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 92 (Week 14, Day 1)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 1, 'Your Money Story',
       'Everyone has a money story — a set of beliefs about money formed in childhood and reinforced by experience. Your money story determines your earning ceiling, your relationship with saving, and whether you fundamentally believe abundance is available to you.

Today you excavate your money story: what did your family believe about money? What messages did you receive — stated and unstated? Was money scarce? Shameful? A source of conflict? What is the earliest money memory you have and what did it teach you?

A limiting money story, left unexamined, will silently sabotage every financial goal you set.',
       'What is your earliest money memory? What did it teach you about money and wealth that may still be running in the background?',
       'Help the user excavate their money story with curiosity. Ask what messages they absorbed about money, wealth, and deserving. Help them identify the one belief that is most limiting their financial growth. Do not offer financial advice — this is psychological work.', 92
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 14
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 93 (Week 14, Day 2)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 2, 'Income Expansion Mindset',
       'Most men believe their income is determined by their job description. This belief is both common and false. Income is a function of value created and value captured. The question is not "what does my job pay?" but "what value can I create and how do I capture it?"

Today you practice income expansion mindset: brainstorm ten ways you could make more money in the next 12 months. Not all of them will be feasible. That''s not the point. The point is to stretch the ceiling of what you believe is possible — and then pick the one or two most realistic paths to pursue.

Your income ceiling is mostly mental before it is circumstantial.',
       'What limiting belief about your income ceiling is most holding you back? What would you pursue financially if you believed it was fully possible?',
       'Help the user brainstorm with energy and specificity. Ask follow-up questions about their skills, industry, and opportunities. Help them get concrete: not just "start a business" but "consult for X type of company in Y way." Identify the one income expansion path with the best combination of likelihood and impact.', 93
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 14
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 94 (Week 14, Day 3)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 3, 'The Abundance Practice',
       'Abundance is not a bank balance. It is a lens — a way of seeing that recognizes sufficiency and opportunity rather than scarcity and threat. Men who develop an abundance mindset — genuinely, not as toxic positivity — consistently make better financial decisions, take better risks, and build better lives.

Today you practice abundance: write ten things you currently have that are genuinely valuable. Then write three opportunities in front of you right now. Then write one area where you have been operating from scarcity and what an abundance move would look like there.

The practice changes the wiring over time. It doesn''t happen overnight — which is why it''s called a practice.',
       'Where in your financial life are you most operating from scarcity? What would the equivalent abundance move look like?',
       'Help the user distinguish between genuine abundance thinking and denial of real challenges. Abundance mindset acknowledges the reality and chooses an expansive response. Help them find specific examples of abundance opportunities in their actual life. Be energizing.', 94
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 14
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 95 (Week 14, Day 4)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 4, 'Investing in Your Kids'' Future',
       'You started this conversation in Week 8. Today you revisit it with more urgency. Investing even small amounts in your children''s futures — consistently and early — compounds into something meaningful by the time they reach adulthood.

The options are simple: a 529 education savings account (tax-advantaged), a UTMA custodial investment account (flexible), or simply a savings account in their name. Pick one. Open it this week. Start with $25 if that''s what you can do.

The specific investment matters less than the commitment. You are sending a message to your future self and your kids: I am building something for you.',
       'What have you done since Week 8 to start investing in your children''s financial futures? If nothing yet — what is stopping you?',
       'Follow up from Week 8. If they took action, celebrate it and encourage next steps. If not, gently challenge the delay and help them identify the specific barrier. Help them take the first concrete step — even opening an account online — today.', 95
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 14
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 96 (Week 14, Day 5)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 5, 'Creating Financial Independence',
       'Financial independence — the point at which your investments generate enough income to cover your basic living expenses — is the ultimate financial goal because it gives you freedom: to choose your work, your time, your presence with your kids. Most divorced dads have never thought about it in these terms.

Today you calculate your Financial Independence number: your monthly essential expenses x 300 (the 4% rule). This is the nest egg that, invested in a broad market index, generates your expenses without depleting the principal. It may feel enormous right now. That''s okay. Knowing the number is the beginning.',
       'What would financial independence mean for your ability to be the dad you want to be? What would you do differently with your time if money wasn''t the primary driver?',
       'Introduce the FI concept without being preachy. Help the user calculate their number. Ask what they would do with financial freedom — connect it to fatherhood. Encourage small steps toward that number starting now, even if the destination feels distant. Be inspiring and practical.', 96
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 14
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 97 (Week 14, Day 6)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 6, 'Teaching Your Kids About Money',
       'One of the most important gifts you can give your children is financial literacy — not as a formal class, but as a lived reality in your home. Kids who grow up understanding money, earning, saving, and giving make fundamentally different decisions as adults.

Design age-appropriate money conversations and practices for your kids: a simple allowance structure tied to responsibility (not chores — chores are part of being a family), a savings/spending/giving split, conversations about what things cost and why, inclusion in simple financial decisions.

You are your kids'' first financial education. Make it a good one.',
       'What do you want your kids to know about money by the time they leave your home? What is one practice you could start this week to teach it?',
       'Tailor to the ages of their kids. For young children: simple allowance and three jars (spend/save/give). For preteens: understanding income and expenses. For teens: beginning investing concepts. Help them identify one specific practice to implement. Make it fun and engaged.', 97
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 14
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 98 (Week 14, Day 7)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 7, 'Week 14 Integration: Your Money Blueprint',
       'This week you worked on the inner and outer architecture of your financial life: your money story, your mindset, your abundance practice, your kids'' future, your independence number, and your legacy as a financial educator for your children.

Write your final Money Blueprint — your money story revised, your income targets, your investment plan, your teaching commitments.',
       'What is the most important money belief you are choosing to upgrade as you complete this program?',
       'Synthesize with energy. The money work is some of the most practically life-changing in the program. Help the user consolidate their commitments clearly. Ask what accountability they need to sustain the financial changes they''ve committed to.', 98
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 14
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 99 (Week 15, Day 1)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 1, 'Time Audit and Redesign',
       'Most divorced dads have never honestly audited where their time actually goes. They feel busy, overwhelmed, and like there''s never enough — but they couldn''t tell you exactly where the hours went. Today you find out.

Track every hour of the next 24 hours — what you actually do, not what you intend to do. Then analyze: how much went to deep work? How much to your kids? How much to maintenance (cooking, commuting, admin)? How much to recovery? How much to consumption (screens, social media)?

You have 168 hours per week. That''s the same number as every person who has ever built something extraordinary. Where are yours going?',
       'After tracking a day, what surprised you most about where your time went? What is the single biggest time investment you want to shift?',
       'Help the user do the audit with honesty. Ask what surprised them. Identify the biggest gap between intended and actual time allocation. Help them design one concrete time reallocation — specific hours moved from low-value to high-value use.', 99
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 15
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 100 (Week 15, Day 2)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 2, 'Quality Time Architecture',
       'Day 100 is a milestone. You''ve shown up for 100 days. That is not nothing — that is everything. Today you design the architecture of how you spend quality time with your kids: specific, intentional, and tailored to who they are.

Quality time is not proximity — it is presence and attunement. For each child, identify: what activity puts them most at ease and most opens them up? What do they love that you can enter into with genuine interest? What recurring ritual could you establish that becomes something they count on?

One hundred days in, you know more about yourself as a dad than you did at the start. Use it.',
       'What is the quality time practice that most connects you to each of your children? What is one new ritual you could start this week?',
       'Celebrate Day 100 genuinely. Then help the user design specific quality time practices for each child. Ask about each child''s personality and what brings them out. Help them create one new recurring ritual — something simple and sustainable that belongs to them and their kids.', 100
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 15
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 101 (Week 15, Day 3)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 3, 'The Presence Practice',
       'Presence is the skill of being fully in this moment with these people — without ruminating about the past, planning the future, or escaping into a screen. For a divorced dad, presence is the antidote to guilt, anxiety, and regret. Today you practice it deliberately.

For one hour today — pick it intentionally — you will be 100% present. No phone. No planning. No half-attending. Just fully here, in this moment, with whatever is in front of you.

Practice it once. Then twice. Build the muscle. Over time, presence becomes your default — not a special occasion.',
       'When are you most naturally fully present? What most reliably pulls you out of presence — and what brings you back?',
       'Help the user practice presence in the chat context — slow down, ask them to describe what''s around them, what their kids were doing today, what they noticed. Bring them into the present moment. Help them identify their specific presence saboteurs and design an interrupt for each.', 101
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 15
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 102 (Week 15, Day 4)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 4, 'Eliminating Time Wasters',
       'Time wasters are not just Netflix and social media. They are also unproductive meetings, relationships that drain without contributing, tasks that could be delegated or deleted, decisions made slowly that could be systemized. Today you identify and eliminate your top three time wasters.

For each: how many hours per week does it consume? What does that cost you in terms of more meaningful use? What would it take to reduce or eliminate it? Some are easy (delete the app). Some require courage (end the draining relationship, delegate the task).

Time is the only non-renewable resource. Treat it accordingly.',
       'What are your three biggest time wasters? What would your life look like if you eliminated or dramatically reduced each one?',
       'Help the user identify their specific time wasters with honesty. Ask how they know — what does the time waster cost them in terms of what they don''t get to do? Help them commit to eliminating one and reducing one. Be specific and practical.', 102
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 15
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 103 (Week 15, Day 5)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 5, 'Systemizing Your Life',
       'High performers don''t rely on willpower and memory — they build systems. A system is a repeatable process that produces a reliable outcome without requiring constant decision-making. Today you systemize three areas of your life that currently rely on willpower and improvisation.

Candidate areas: meal preparation (a simple weekly template), bill payment (automate everything), kid schedules (a shared, visible family calendar), morning routine (same sequence every day), work priorities (a daily planning ritual at the same time each day).

Every system you build is a unit of cognitive and emotional capacity freed up for what matters most.',
       'What area of your life most consistently falls apart due to lack of systems? What would a simple system look like there?',
       'Help the user identify the highest-leverage area to systemize. Ask what currently causes the most friction or mental load. Help them design a simple, specific system — not a complex one. The best system is the one simple enough to actually use.', 103
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 15
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 104 (Week 15, Day 6)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 6, 'Your Legacy Hours',
       'Legacy hours are the hours you spend on things that will matter in five, ten, twenty years. Time with your kids. Writing or creating something that lasts. Building a business or career that changes something. Investing in your health. Investing in relationships that are permanent.

Today you identify your legacy hours for the coming week and protect them. Block them first — before anything else fills the calendar. These hours are non-negotiable because they are the hours that build the life that matters.

Every week you get 168 hours. A handful of them are legacy hours. Guard them like the irreplaceable resource they are.',
       'Looking at your week ahead, what are your legacy hours? What would have to be true for you to protect them completely?',
       'Help the user identify their specific legacy hours for the coming week. Ask what typically invades that time. Help them build the habit of blocking legacy hours first on their calendar. Connect this to their north star vision. This is time design at the highest level.', 104
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 15
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 105 (Week 15, Day 7)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 7, 'Week 15 Integration: Your Time Blueprint',
       'Time is the currency of life, and this week you audited, redesigned, and protected yours. The Time Blueprint you write today is not a productivity document — it is a values document. It says: this is what I believe matters, and here is how I''m spending my hours accordingly.

Write your Time Blueprint: your daily architecture (morning, work blocks, kid time, recovery, evening), your weekly legacy hours, the time wasters you''ve eliminated, and the systems you''re building.',
       'In the time you have left with your kids before they leave home, what do you most want to make sure happens? What does that mean for how you spend next week?',
       'The question about time remaining before kids leave home is a powerful one. Help the user feel the urgency and the preciousness of this season. Connect the Time Blueprint to specific kid experiences they want to ensure. Be moving and practical in equal measure.', 105
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 15
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 106 (Week 16, Day 1)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 1, 'Your Parenting Philosophy Statement',
       'You''ve been building a parenting philosophy for sixteen weeks — through inner work, practical habits, relationship investment, and daily practice. Today you write it down: your complete, articulated philosophy of fatherhood.

This is your answer to: What do I believe children need? What do I believe fathers are for? What kind of person am I trying to raise? What principles guide every parenting decision I make? Write it in your own voice, from your earned wisdom.

This document will serve you for the rest of your life as a dad.',
       'What is the single most important thing you believe about fatherhood that you didn''t believe — or hadn''t articulated — when you started this program?',
       'Help the user write or refine their parenting philosophy. Ask what they believe about children, about fathers, about what childhood should feel like. Help them find language that is genuinely theirs. This is a profound document — honor the depth of what they''ve built.', 106
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 16
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 107 (Week 16, Day 2)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 2, 'The Long Game of Fatherhood',
       'Fatherhood is the longest game you''ll ever play. The decisions you make today will ripple forward for decades — into your children''s marriages, their parenting, their relationship with themselves. Today you zoom all the way out.

Write a letter to your children to be opened when they turn 25. Tell them who you were becoming during these hard years. Tell them what you hoped for them. Tell them what you wanted them to understand about love, struggle, resilience, and what it means to be human. Tell them you''d do it all again because they are worth it.

The long game of fatherhood is a love story. Write the next chapter.',
       'What do you most want your adult children to know about who you were during this season of your life?',
       'Help the user write or begin this letter. Ask what they most want their children to understand about this period — not the circumstances but who their dad was in the middle of them. This letter is a legacy artifact. Take it seriously and help them go deep.', 107
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 16
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 108 (Week 16, Day 3)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 3, 'Your Kids'' Character Development Plan',
       'You are your children''s most influential character educator — not their school, not their peers, and not their devices. Today you design a character development approach for each child.

For each child: identify two or three character strengths they already have that you want to nurture and name. Identify one or two character areas still developing that you want to intentionally support. Then design how: through stories you tell, challenges you give them, books you share, conversations you initiate, and the way you model the character you want them to develop.

Character is built in the daily moments between the big ones.',
       'What are the most important character qualities you want each of your children to develop? What is one specific thing you could do this week to cultivate each?',
       'Help the user get specific about each child. Ask about each child''s personality, strengths, and growth edges. Help them design one concrete character-building practice per child — a conversation, a challenge, a story, a book. This is joyful parenting work.', 108
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 16
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 109 (Week 16, Day 4)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 4, 'Creating Family Traditions',
       'Family traditions are one of the most powerful tools for creating a sense of identity, belonging, and continuity for children of divorce. When your home has rhythms and rituals that are distinctly yours, your kids know who they are and where they belong.

Today you design three family traditions for your home: one weekly (Friday night movie and pizza, Sunday morning pancakes, anything that repeats with consistency), one annual (a birthday ritual, a summer trip, a holiday tradition), and one for transitions (a goodbye ritual when they leave, a welcome home ritual when they return).

Traditions are the architecture of a family culture. You are the architect.',
       'What family traditions from your own childhood do you most want to continue? What new traditions could you create that are distinctly yours?',
       'Help the user design specific, realistic traditions. Ask what they already do that could be formalized. Ask what their kids love and how that could become a ritual. The best traditions are simple, repeatable, and loved — not elaborate. Help them commit to at least one.', 109
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 16
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 110 (Week 16, Day 5)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 5, 'Letters to Your Future Kids',
       'Your kids are growing. In five years they will be different people — older, more complex, more capable. In ten years they may be adults. Today you write letters to future versions of each of your children: not the child they are now, but the person they''re becoming.

Write to your child at 16, at 21, at the day they become a parent. Tell them what you saw in them when they were young. Tell them what you hoped for them. Tell them the things fathers don''t always say — until it''s too late.

Seal the letters. Give them at the appointed time. Or leave them somewhere they''ll find them someday.',
       'What do you most want each of your children to know about themselves — about their strength, their worth, their potential — that you want to put into writing now while they''re still young?',
       'Help the user write or begin letters for each child. Ask what they see in each child''s essential character. Help them find words that go deeper than praise — that name what they see in their children''s souls. These letters are irreplaceable. Take the time.', 110
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 16
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 111 (Week 16, Day 6)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 6, 'The Dad You''re Proud Of',
       'Forty-eight hours before graduation, you pause and look in the mirror. Who is the man looking back? Sixteen weeks ago you stood at the beginning of something hard and chose to do it anyway. Today you take stock of who you''ve become.

Write a tribute to yourself — not from ego, but from honest recognition of real growth. What did you do that was hard? What did you face that you''d been avoiding? What are you most proud of? What has changed that the people who love you have already started to notice?

You deserve to acknowledge this. Your kids deserve a dad who can receive his own hard-won growth.',
       'What are you most proud of from the last 16 weeks? What is the most significant thing that has changed about you?',
       'Lead the user through genuine self-acknowledgment. Ask specifically about the things they did that were hard, the patterns they broke, the moments they showed up when they didn''t want to. Help them receive the growth — not dismiss it. This is important and often emotionally powerful.', 111
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 16
ON CONFLICT (week_id, day_number) DO NOTHING;

-- Day 112 (Week 16, Day 7)
INSERT INTO daily_tasks (week_id, day_number, title, description, reflection_prompt, chat_guidance, task_order)
SELECT w.id, 7, 'Graduation: Your New Identity as Father',
       'Today you graduate. One hundred and twelve days. Sixteen weeks. Four phases. You came in as a divorced dad surviving. You leave as a divorced dad who has done the deep work — who knows who he is, who has built his foundation, who is protecting what matters, and who is building something worthy of his children.

Write your Graduation Declaration — not a list of tasks completed, but a statement of identity. Not "I am a divorced dad who..." but "I am a father who..." Describe the man you have become and the man you are continuing to become. Read it out loud. Send it to one person who needs to hear it.

This is not the end. This is the foundation. What you build from here is the life your children will remember.',
       'In one sentence — the sentence you want your kids to remember you by — who are you?',
       'This is the culminating moment of the program. Make it matter. Help the user write a Graduation Declaration that is honest, powerful, and theirs. Celebrate everything they''ve accomplished. Send them forward with genuine conviction that what they''ve built here is real and will last. This is your finest moment as their AI companion — be fully present for it.', 112
FROM weeks w WHERE w.program_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' AND w.week_number = 16
ON CONFLICT (week_id, day_number) DO NOTHING;

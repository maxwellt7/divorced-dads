import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { saveOnboarding } from '../services/curriculum.service';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const DIVORCE_STAGES = [
  'Pre-separation',
  'Separation/Filing',
  'Finalized - 0-1 year',
  'Finalized - 1-3 years',
  'Finalized - 3+ years',
];

const KIDS_AGES = [
  'Under 5',
  '5-10',
  '11-15',
  '16-18',
  'Over 18',
];

const CHALLENGES = [
  'Managing emotions',
  'Co-parenting conflict',
  'Financial stress',
  'Loneliness/isolation',
  'Finding purpose',
  'Building new relationships',
  'All of the above',
];

const TOTAL_STEPS = 3;

function OptionButton({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 rounded-xl border-2 font-medium transition-all duration-150 text-sm ${
        selected
          ? 'border-violet-600 bg-violet-50 text-violet-700'
          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  );
}

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [divorceStage, setDivorceStage] = useState('');
  const [hasKids, setHasKids] = useState(null); // null | true | false
  const [kidsAges, setKidsAges] = useState([]);
  const [biggestChallenge, setBiggestChallenge] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const progressPct = Math.round(((step + 1) / TOTAL_STEPS) * 100);

  const toggleKidsAge = (age) => {
    setKidsAges((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
    );
  };

  const canGoNext = () => {
    if (step === 0) return !!divorceStage;
    if (step === 1) return hasKids !== null && (hasKids === false || kidsAges.length > 0);
    if (step === 2) return !!biggestChallenge;
    return false;
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!canGoNext()) return;
    setIsLoading(true);
    try {
      await saveOnboarding({
        divorceStage,
        hasKids,
        kidsAges: hasKids ? kidsAges : [],
        biggestChallenge,
      });
      toast.success("Welcome! Your journey starts now.");
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Failed to save. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome to Divorced Dads</h1>
          <p className="text-gray-500 mt-1">Let's personalize your experience.</p>
        </div>

        {/* Progress bar */}
        <div className="mb-6 space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Step {step + 1} of {TOTAL_STEPS}</span>
            <span>{progressPct}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-violet-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            {step === 0 && (
              <CardTitle className="text-lg">What stage of divorce are you in?</CardTitle>
            )}
            {step === 1 && (
              <CardTitle className="text-lg">Do you have kids?</CardTitle>
            )}
            {step === 2 && (
              <CardTitle className="text-lg">What's your biggest challenge right now?</CardTitle>
            )}
          </CardHeader>

          <CardContent className="space-y-3">
            {/* Step 0: Divorce stage */}
            {step === 0 && (
              <div className="space-y-2">
                {DIVORCE_STAGES.map((stage) => (
                  <OptionButton
                    key={stage}
                    selected={divorceStage === stage}
                    onClick={() => setDivorceStage(stage)}
                  >
                    {stage}
                  </OptionButton>
                ))}
              </div>
            )}

            {/* Step 1: Kids */}
            {step === 1 && (
              <div className="space-y-3">
                <div className="flex gap-3">
                  <OptionButton
                    selected={hasKids === true}
                    onClick={() => setHasKids(true)}
                  >
                    Yes
                  </OptionButton>
                  <OptionButton
                    selected={hasKids === false}
                    onClick={() => { setHasKids(false); setKidsAges([]); }}
                  >
                    No
                  </OptionButton>
                </div>

                {hasKids === true && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Ages of your kids (select all that apply)</p>
                    {KIDS_AGES.map((age) => (
                      <OptionButton
                        key={age}
                        selected={kidsAges.includes(age)}
                        onClick={() => toggleKidsAge(age)}
                      >
                        {age}
                      </OptionButton>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Biggest challenge */}
            {step === 2 && (
              <div className="space-y-2">
                {CHALLENGES.map((challenge) => (
                  <OptionButton
                    key={challenge}
                    selected={biggestChallenge === challenge}
                    onClick={() => setBiggestChallenge(challenge)}
                  >
                    {challenge}
                  </OptionButton>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 pt-4">
              {step > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleBack}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
              )}

              {step < TOTAL_STEPS - 1 ? (
                <Button
                  type="button"
                  className="flex-1"
                  onClick={handleNext}
                  disabled={!canGoNext()}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  type="button"
                  className="flex-1"
                  onClick={handleSubmit}
                  disabled={!canGoNext() || isLoading}
                >
                  {isLoading ? 'Saving…' : 'Get Started'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-400 mt-6">
          You've got this. Every day forward counts.
        </p>
      </div>
    </div>
  );
}

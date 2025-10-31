"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check, Eye, Globe, Lock, Cloud, Settings, BookOpen, Share2, Sparkles } from 'lucide-react';
import { ChalkboardSimpleIcon, NotebookIcon, SealQuestionIcon } from '@phosphor-icons/react';

export default function ClarityLensOnboarding() {
  const [step, setStep] = useState(1);
  const [readingLevel, setReadingLevel] = useState('middle_school');
  const [language, setLanguage] = useState<string | null>('en');
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const levels = [
    { id: 'elementary', label: 'Elementary', grade: 'Grades 1-5', icon: '📚', example: 'You can get money from the trust.' },
    { id: 'middle_school', label: 'Middle School', grade: 'Grades 6-8', icon: '📖', example: 'You are allowed to receive payments from the trust account.' },
    { id: 'high_school', label: 'High School', grade: 'Grades 9-12', icon: '📝', example: 'You may receive distributions from the trust based on the terms outlined.' },
    { id: 'college', label: 'College+', grade: 'Grade 13+', icon: '🎓', example: 'The beneficiary shall be entitled to receive distributions from the trust corpus.' }
  ];

const handleComplete = () => {
  // Send message TO extension via content-script bridge
  window.postMessage(
    {
      from: 'clarity_webapp', // guard identifier
      payload: {
        type: 'ONBOARDING_COMPLETE',
        data: {
          readingLevel: 'elementary',
          language: 'en',
          locationGranted: true,
          onboardingComplete: true
        }
      }
    },
    '*' // later restrict to domain
  );

  setShowConfetti(true);
  setTimeout(() => {
    alert('🎉 Onboarding complete!');
  }, 1000);
};

  // Step 1: Welcome
  const WelcomeStep = () => (
    <div className="text-center space-y-8">
      <div className="flex items-center w-full h-20">
        <img src="/logo.png" alt="Welcome to ClarityLens" className="w-48 mx-auto" />
      </div>
      
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to ClarityLens
        </h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          Make any website easy to read
        </p>
      </div>

      <Card className="max-w-md mx-auto bg-gradient-to-br from-blue-50 to-purple-50 border-2">
        <CardContent className="pt-1">
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#46c9bd] text-black flex items-center justify-center flex-shrink-0 mt-0.5">
                <NotebookIcon size={20} weight="fill" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Reading complex web content</p>
                <p className="text-sm text-gray-600">Tax forms, legal papers, medical info</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#46c9bd] text-black flex items-center justify-center flex-shrink-0 mt-0.5">
                <SealQuestionIcon size={20} weight="fill" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Understand every part of a web page</p>
                <p className="text-sm text-gray-600">The forms, required info and just enough info</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#46c9bd] text-black flex items-center justify-center flex-shrink-0 mt-0.5">
                <ChalkboardSimpleIcon size={20} weight="fill" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Learning at your own level</p>
                <p className="text-sm text-gray-600">Choose your perfect reading level</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-center">
        <Button 
          size="lg" 
          onClick={() => setStep(2)}
          className="h-14 px-8 text-lg font-medium"
        >
          Let's Get Started
        </Button>
        <Button 
          size="lg" 
          variant="outline"
          className="h-14 px-8 text-lg font-medium"
        >
          Watch Demo
        </Button>
      </div>
    </div>
  );

  // Step 2: Permissions
  const PermissionsStep = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#6bd4ca] mb-2">
          <Lock className="w-8 h-8 text-black" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          ClarityLens Needs Your Permission
        </h2>
        <p className="text-gray-600 text-lg">
          We need access to help you read better
        </p>
      </div>

      <div className="space-y-3 max-w-lg mx-auto">
        <Card className="border-2 ">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#0e2826] flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Read webpage text</h3>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Why:</strong> To simplify it for you
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#0e2826] flex items-center justify-center flex-shrink-0">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Store your personal information</h3>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Why:</strong> Give you a personalized experience
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="max-w-lg mx-auto bg-gray-50">
        <CardContent className="pt-3">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0e2826] flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">About Your Privacy</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✓ We process everything locally</li>
                <li>✓ We don't track your browsing</li>
                <li>✓ You control what gets saved</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-3">
        <Button 
          size="lg" 
          onClick={() => {
            setPermissionGranted(true);
            setTimeout(() => setStep(3), 500);
          }}
          disabled={permissionGranted}
          className="h-14 px-12 text-lg"
        >
          {permissionGranted ? (
            <>
              <Check className="mr-2 h-5 w-5" /> Proceed
            </>
          ) : (
            'Proceed'
          )}
        </Button>
        <div>
        </div>
      </div>
    </div>
  );

  // Step 3: Preferences
  const PreferencesStep = () => (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0e2826] mb-2">
          <Settings className="w-8 h-8 text-black" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          Let's Personalize ClarityLens
        </h2>
        <p className="text-gray-600 text-lg">
          Choose what works best for you
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            What reading level feels best?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {levels.map((level) => (
              <Card
                key={level.id}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  readingLevel === level.id
                    ? 'border-2 border-blue-600 bg-blue-50 shadow-lg'
                    : 'border-2 border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setReadingLevel(level.id)}
              >
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-2">{level.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {level.label}
                  </h3>
                  <p className="text-sm text-gray-600">{level.grade}</p>
                  <p className="text-sm text-gray-600">E.g: {level.example}</p>
                  {readingLevel === level.id && (
                    <div className="mt-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                        <Check className="w-3 h-3" /> Selected
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* <Card className="bg-amber-50 border-amber-200">
          <CardContent className="pt-4">
            <p className="text-sm text-gray-700 text-center">
              💡 Don't worry, you can change these anytime in settings
            </p>
          </CardContent>
        </Card> */}
      </div>

      <div className="flex gap-3 justify-center">
        <Button 
          size="lg" 
          onClick={() => setStep(4)}
          className="h-14 px-12 text-lg"
        >
          Continue
        </Button>
        <Button 
          size="lg"
          variant="outline"
          onClick={() => setStep(4)}
          className="h-14 px-8 text-lg"
        >
          Skip - use defaults
        </Button>
      </div>
    </div>
  );

  // Step 4: Interactive Tutorial
  const TutorialStep = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">
          Try It Now!
        </h2>
        <p className="text-gray-600 text-lg">
          Step 1 of 3
        </p>
      </div>

      <Card className="max-w-2xl mx-auto border-2">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-sm text-gray-600">Sample Complex Text:</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm leading-relaxed text-gray-900 bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
            The aforementioned party hereinafter referred to as "the beneficiary" shall be entitled to receive distributions from the trust corpus, provided that such distributions are made in accordance with the provisions set forth in Section 12.3(b) of the Trust Agreement, executed on the date first written above, and subject to the discretion of the trustee, who may withhold distributions if, in the trustee's sole judgment, such distributions would not be in the best interests of the beneficiary or the trust estate.
          </p>
        </CardContent>
      </Card>

      <div className="max-w-2xl mx-auto">
        <Card className="bg-blue-50 border-2 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">👆</div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">
                  Click the Extensions icon in your browser toolbar
                </p>
                <p className="text-sm text-gray-600">
                  (Look at the top right corner of your browser)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="bg-blue-50 border-2 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">
                📌
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">
                  Pin the ClarityLens icon from the extensions list
                </p>
                <p className="text-sm text-gray-600">
                  (Look through the list to find ClarityLens)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

            <div className="max-w-2xl mx-auto">
        <Card className="bg-blue-50 border-2 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">
                🔍
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">
                  Click on the ClarityLens icon to simplify the text
                </p>
                <p className="text-sm text-gray-600">
                  (Highlight the sample text first and click the icon)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button
          size="lg"
          onClick={() => setStep(5)}
          className="h-14 px-12 text-lg"
        >
          I have tried it!
        </Button>
      </div>
    </div>
  );

  // Step 5: Success & Tips
  const SuccessStep = () => {
    useEffect(() => {
      setShowConfetti(true);
    }, []);

    return (
      <div className="space-y-6">
        {showConfetti && (
          <div className="text-center text-6xl animate-bounce">
            🎉
          </div>
        )}

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">
            Amazing! Look!
          </h2>
          <p className="text-gray-600 text-lg">
            Much easier to read now
          </p>
        </div>

        <div className="max-w-2xl mx-auto grid gap-3">
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg border-2 border-gray-200">
            <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            <span className="text-gray-900 font-medium">Works on all webpages</span>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg border-2 border-gray-200">
            <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            <span className="text-gray-900 font-medium">Your information is for you alone</span>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg border-2 border-gray-200">
            <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            <span className="text-gray-900 font-medium">Your preferences are used everywhere</span>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Button 
            size="lg" 
            onClick={handleComplete}
            className="h-14 px-12 text-lg"
          >
            Start Using ClarityLens
          </Button>
        </div>
      </div>
    );
  };

  const steps = [
    <WelcomeStep key="welcome" />,
    <PermissionsStep key="permissions" />,
    <PreferencesStep key="preferences" />,
    <TutorialStep key="tutorial" />,
    <SuccessStep key="success" />
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-center text-sm text-gray-600 mt-2">
            Step {step} of {totalSteps}
          </p>
        </div>

        {/* Current Step */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {steps[step - 1]}
        </div>

        {/* Navigation */}
        {step > 1 && step < totalSteps && (
          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => setStep(step - 1)}
              className="text-gray-600"
            >
              ← Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
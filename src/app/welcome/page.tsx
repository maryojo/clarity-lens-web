"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check, Eye, Globe, Lock, Cloud, Settings, BookOpen, Share2, Sparkles } from 'lucide-react';

export default function ClarityLensOnboarding() {
  const [step, setStep] = useState(1);
  const [readingLevel, setReadingLevel] = useState('middle_school');
  const [language, setLanguage] = useState('en');
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const levels = [
    { id: 'elementary', label: 'Elementary', grade: 'Grades 1-5', icon: '📚' },
    { id: 'middle_school', label: 'Middle School', grade: 'Grades 6-8', icon: '📖' },
    { id: 'high_school', label: 'High School', grade: 'Grades 9-12', icon: '📝' },
    { id: 'college', label: 'College+', grade: 'Grade 13+', icon: '🎓' }
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
    '*' // later restrict to your domain
  );

  setShowConfetti(true);
  setTimeout(() => {
    alert('🎉 Onboarding complete!');
  }, 1000);
};

  // Step 1: Welcome
  const WelcomeStep = () => (
    <div className="text-center space-y-8">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
        <Eye className="w-10 h-10 text-blue-600" />
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
        <CardContent className="pt-6">
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Reading complex documents</p>
                <p className="text-sm text-gray-600">Tax forms, legal papers, medical info</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Understanding other languages</p>
                <p className="text-sm text-gray-600">Translate and simplify together</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Learning at your own pace</p>
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
          className="h-14 px-8 text-lg"
        >
          Let's Get Started
        </Button>
        <Button 
          size="lg" 
          variant="outline"
          className="h-14 px-8 text-lg"
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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-2">
          <Lock className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          ClarityLens Needs Your Permission
        </h2>
        <p className="text-gray-600 text-lg">
          We need access to help you read better
        </p>
      </div>

      <div className="space-y-3 max-w-lg mx-auto">
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Read webpage text</h3>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Why:</strong> To simplify it for you
                </p>
                <span className="inline-block px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                  Required
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-gray-600 flex items-center justify-center flex-shrink-0">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Save to your library</h3>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Why:</strong> Access on any device
                </p>
                <span className="inline-block px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                  Optional
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="max-w-lg mx-auto bg-gray-50">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">🔒 Your Privacy</h3>
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
              <Check className="mr-2 h-5 w-5" /> Access Granted
            </>
          ) : (
            'Grant Access'
          )}
        </Button>
        <div>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Learn more about privacy
          </a>
        </div>
      </div>
    </div>
  );

  // Step 3: Preferences
  const PreferencesStep = () => (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-2">
          <Settings className="w-8 h-8 text-purple-600" />
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

        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            Do you need translation?
          </label>
          <div className="flex gap-3">
            <select 
              className="flex-1 h-12 px-4 border-2 border-gray-300 rounded-lg text-base focus:border-blue-600 focus:outline-none"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
              <option value="ar">Arabic</option>
            </select>
            <Button 
              variant="outline" 
              onClick={() => setLanguage(null)}
              className="h-12"
            >
              Skip this
            </Button>
          </div>
        </div>

        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="pt-4">
            <p className="text-sm text-gray-700 text-center">
              💡 Don't worry, you can change these anytime in settings
            </p>
          </CardContent>
        </Card>
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
                  Click the ClarityLens icon in your browser toolbar
                </p>
                <p className="text-sm text-gray-600">
                  (Look at the top right corner of your browser)
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
          Simulate Extension Click →
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
            Amazing! Look! 🎉
          </h2>
          <p className="text-gray-600 text-lg">
            Much easier to read now
          </p>
        </div>

        <Card className="max-w-2xl mx-auto border-2 border-green-200 bg-green-50">
          <CardHeader className="bg-green-100">
            <CardTitle className="text-sm text-green-700">Simplified Version:</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-base leading-relaxed text-gray-900">
              The person mentioned above (we'll call them "the beneficiary") can receive money from the trust. But first, the trustee needs to check the rules in Section 12.3(b) of the Trust Agreement. The trustee can decide not to give money if they think it's not good for the beneficiary or the trust.
            </p>
          </CardContent>
        </Card>

        <div className="max-w-2xl mx-auto grid gap-3">
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg border-2 border-gray-200">
            <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            <span className="text-gray-900 font-medium">Saved to your library</span>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg border-2 border-gray-200">
            <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            <span className="text-gray-900 font-medium">Available on all devices</span>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg border-2 border-gray-200">
            <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            <span className="text-gray-900 font-medium">You can share it with others</span>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto bg-gray-50">
          <CardHeader>
            <CardTitle>Quick Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Your Library</h3>
                <p className="text-sm text-gray-600">
                  Access saved pages anytime at clarity.app/library
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Settings className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Change Reading Level</h3>
                <p className="text-sm text-gray-600">
                  Try different levels to find what works best
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Share2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Share with Others</h3>
                <p className="text-sm text-gray-600">
                  Help family and friends understand too
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-center">
          <Button 
            size="lg" 
            onClick={handleComplete}
            className="h-14 px-12 text-lg"
          >
            Start Using ClarityLens
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="h-14 px-8 text-lg"
          >
            Visit My Library
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
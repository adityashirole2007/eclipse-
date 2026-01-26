import React, { useState, useEffect } from 'react';

const IntroFlow = () => {
  const [step, setStep] = useState(0);
  const [shake, setShake] = useState(false);
  const [formData, setFormData] = useState({});

  // Simulate phone vibration on new dialogue
  useEffect(() => {
    setShake(true);
    const timer = setTimeout(() => setShake(false), 300);
    return () => clearTimeout(timer);
  }, [step]);

  const nextStep = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const steps = [
    {
      id: "intro",
      text: "Hi! I'm Eclipse. I'll be your guide through Class 10!",
      type: "dialogue",
      expression: "neutral"
    },
    {
      id: "interest",
      text: "What would you like to explore today?",
      type: "choice",
      options: ["Science", "Maths", "English", "Social Science"],
      field: "subject"
    },
    {
      id: "commitment",
      text: "How much time can you commit daily?",
      type: "choice",
      options: ["5 mins (Casual)", "15 mins (Regular)", "30 mins (Serious)"],
      field: "dailyGoal"
    },
    // More steps can be added here following your list...
  ];

  const currentStep = steps[step];

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-6 transition-transform ${shake ? 'animate-bounce' : ''}`}>
      {/* Logo Placeholder */}
      <div className="w-32 h-32 mb-8 rounded-full bg-slate-900 flex items-center justify-center shadow-xl">
         <span className="text-white font-bold text-xs">LOGO: ECLIPSE</span>
      </div>

      {/* Dialogue Box */}
      <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-6 w-full max-w-sm">
        <div className="absolute -top-3 left-10 w-6 h-6 bg-white border-t-2 border-l-2 border-gray-200 rotate-45"></div>
        <p className="text-lg font-bold text-gray-700">{currentStep.text}</p>
      </div>

      {/* Interaction Area */}
      <div className="mt-8 w-full max-w-sm space-y-3">
        {currentStep.type === "choice" ? (
          currentStep.options.map((opt) => (
            <button
              key={opt}
              onClick={() => nextStep({ [currentStep.field]: opt })}
              className="w-full py-4 px-6 text-left font-bold border-2 border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-400 transition-all active:translate-y-1"
            >
              {opt}
            </button>
          ))
        ) : (
          <button
            onClick={() => nextStep({})}
            className="w-full py-4 bg-blue-500 text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 uppercase tracking-wide"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default IntroFlow;
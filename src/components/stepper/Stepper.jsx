import { useState } from 'react';
import { Button } from '../ui/button';

const steps = [
  {
    name: 'Overview',
    component: (
      <div>
        <h1 className="text-3xl text-black mb-10">Overview</h1>
      </div>
    ),
  },
  {
    name: 'Management',
    component: (
      <div>
        <h1 className="text-3xl text-black mb-10">Management</h1>
      </div>
    ),
  },
  {
    name: 'Asset Details',
    component: (
      <div>
        <h1 className="text-3xl text-black mb-10">Asset Details</h1>
      </div>
    ),
  },
  {
    name: 'Financial',
    component: (
      <div>
        <h1 className="text-3xl text-black mb-10">Financial</h1>
      </div>
    ),
  },
  {
    name: 'Disclaimer',
    component: (
      <div>
        <h1 className="text-3xl text-black mb-10">Disclaimer</h1>
      </div>
    ),
  },
];

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex gap-10 bg-white drop-shadow-md p-2 rounded-xl">
      <div className="flex flex-col items-start rounded-3xl border border-[#CCE3FF] p-5 bg-[#F9FCFF]">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start ">
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center rounded-full border ${
                  index < currentStep
                    ? 'border-green-500'
                    : index === currentStep
                      ? 'border-blue-500'
                      : 'border-[#8BBFFF]'
                }`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full m-1 ${
                    index < currentStep
                      ? 'bg-green-500 text-white'
                      : index === currentStep
                        ? 'bg-blue-500 text-white'
                        : 'bg-[#8BBFFF] text-white'
                  }`}
                >
                  {index < currentStep ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                      width="20px"
                      height="20px"
                      fill="#fff"
                    >
                      <path d="M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z" />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-12 my-2 border ${
                    index < currentStep
                      ? 'border-green-500'
                      : 'border-[#8BBFFF]'
                  }`}
                ></div>
              )}
            </div>
            <div className="flex flex-col">
              <div
                className={`ml-2 text-lg align-text-top ${
                  index <= currentStep ? 'text-black' : 'text-[#999999]'
                }`}
              >
                Step {index + 1}
              </div>
              <div
                className={`ml-2 font-semibold text-2xl ${
                  index <= currentStep ? 'text-black' : 'text-[#999999]'
                }`}
              >
                {step.name}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex p-4 flex-col justify-between ">
        {steps[currentStep].component}
        <div className="mt-4 flex space-x-2">
          <Button
            onClick={previousStep}
            className="px-4 py-2 bg-[#8BBFFF] rounded disabled:opacity-50"
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={nextStep}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            disabled={currentStep === steps.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Stepper;

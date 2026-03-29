import { useState, useEffect } from 'react';

interface StatCardProps {
  label: string;
  value: number;
  color: string;
  isVisible: boolean;
  delay: number;
  suffix?: string; 
}

const StatCard = ({ label, value, color, isVisible, delay, suffix }: StatCardProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, value, delay]);

  return (
    <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-xl transition-shadow">
      <p className="text-gray-600 text-sm mb-2 font-medium">{label}</p>
      <p className={`text-4xl font-bold ${color}`}>{count}{suffix}</p>
    </div>
  );
};

export default StatCard;

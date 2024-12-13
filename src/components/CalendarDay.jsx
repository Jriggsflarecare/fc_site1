import { motion } from 'framer-motion';

const CalendarDay = ({ date, state, marking, onDayPress }) => {
  const dayNumber = date.day;
  const poopCount = marking?.poopCount || 0;
  const isSelected = marking?.selected;
  const isDisabled = state === 'disabled';

  return (
    <motion.button
      onClick={() => onDayPress(date)}
      whileHover={{ scale: isDisabled ? 1 : 1.05 }}
      whileTap={{ scale: isDisabled ? 1 : 0.95 }}
      className={`
        w-10 h-10 flex flex-col justify-between items-center
        bg-white rounded-lg m-1 p-1 cursor-pointer
        border border-gray-200 shadow-sm
        ${isSelected ? 'bg-[#4ECDC4] border-[#4ECDC4]' : ''}
        ${isDisabled ? 'opacity-30 cursor-not-allowed' : ''}
      `}
    >
      <span className={`
        text-sm font-bold
        ${isSelected ? 'text-white' : 'text-gray-700'}
        ${isDisabled ? 'text-gray-400' : ''}
      `}>
        {dayNumber}
      </span>
      
      {poopCount > 0 && (
        <div className="flex items-center gap-0.5">
          <span className="text-xs">💩</span>
          <span className={`
            text-xs font-bold
            ${isSelected ? 'text-white' : 'text-gray-700'}
          `}>
            {poopCount}
          </span>
        </div>
      )}
    </motion.button>
  );
};

export default CalendarDay; 
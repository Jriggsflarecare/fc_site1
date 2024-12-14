import { useState, useEffect } from 'react';
import { FoodLog } from '../types';

export const useFoodLogs = () => {
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([]);

  useEffect(() => {
    loadFoodLogs();
  }, []);

  const loadFoodLogs = () => {
    try {
      const logs = localStorage.getItem('food_logs');
      if (logs) {
        const parsedLogs = JSON.parse(logs);
        const formattedLogs = parsedLogs.map((log: any) => ({
          ...log,
          foods: log.foods || [log.productName],
          date: log.date || log.timestamp
        }));
        setFoodLogs(formattedLogs);
      }
    } catch (error) {
      console.error('Error loading food logs:', error);
      setFoodLogs([]);
    }
  };

  const saveFood = async (food: Partial<FoodLog>) => {
    try {
      const newLog: FoodLog = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        date: new Date().toISOString(),
        foods: [food.productName || ''],
        productName: food.productName || '',
        brandName: food.brandName || '',
        nutrition: food.nutrition || '',
        ibdConsiderations: food.ibdConsiderations || ''
      };
      
      const updatedLogs = [newLog, ...foodLogs];
      localStorage.setItem('food_logs', JSON.stringify(updatedLogs));
      setFoodLogs(updatedLogs);
      return true;
    } catch (error) {
      console.error('Error saving food:', error);
      return false;
    }
  };

  const deleteFood = async (id: number) => {
    try {
      const updatedLogs = foodLogs.filter(log => log.id !== id);
      localStorage.setItem('food_logs', JSON.stringify(updatedLogs));
      setFoodLogs(updatedLogs);
      return true;
    } catch (error) {
      console.error('Error deleting log:', error);
      return false;
    }
  };

  return {
    foodLogs,
    saveFood,
    deleteFood
  };
}; 
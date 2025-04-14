
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { add, format, isSameDay, startOfToday } from "date-fns";

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
  "06:00 PM", "06:30 PM", "07:00 PM"
];

interface AppointmentCalendarProps {
  doctorId?: string;
  doctorName?: string;
  specialty?: string;
  onAppointmentBooked?: (date: Date, time: string) => void;
  // Add the new props that BookAppointmentPage is using
  onDateSelect?: (date: Date | null) => void;
  onSlotSelect?: (slot: string) => void;
  selectedDate?: Date | null;
  selectedSlot?: string | null;
}

const AppointmentCalendar = ({
  doctorId,
  doctorName,
  specialty,
  onAppointmentBooked,
  onDateSelect,
  onSlotSelect,
  selectedDate: externalSelectedDate,
  selectedSlot: externalSelectedSlot
}: AppointmentCalendarProps) => {
  const today = startOfToday();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(externalSelectedDate || today);
  const [selectedTime, setSelectedTime] = useState<string | null>(externalSelectedSlot || null);

  // Generate dates for the next week
  const availableDates = Array.from({ length: 7 }, (_, i) => add(today, { days: i }));

  // Function to check if the date is disabled
  const isDateDisabled = (date: Date) => {
    return date < today || !availableDates.some(d => isSameDay(d, date));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    // Call external handler if provided
    if (onDateSelect && date) {
      onDateSelect(date);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    // Call external handler if provided
    if (onSlotSelect) {
      onSlotSelect(time);
    }
  };

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime && onAppointmentBooked) {
      onAppointmentBooked(selectedDate, selectedTime);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Book an Appointment</h3>
        <p className="text-gray-600 mb-4">Select a date and time for your appointment {doctorName && `with ${doctorName}`}.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Select Date</h4>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={isDateDisabled}
              className="rounded-md border"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Select Time</h4>
            {selectedDate ? (
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className={`text-sm ${selectedTime === time ? 'bg-healSmart-blue' : 'border-gray-200 text-gray-700'}`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-48">
                  <p className="text-gray-500">Please select a date first</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {doctorName && specialty && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="font-medium text-gray-900 mb-4">Appointment Summary</h4>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Doctor:</span>
              <span className="font-medium">{doctorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Specialty:</span>
              <span>{specialty}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span>{selectedDate ? format(selectedDate, 'PPPP') : '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span>{selectedTime || '-'}</span>
            </div>
          </div>
          <Button 
            className="w-full bg-healSmart-blue hover:bg-blue-700" 
            disabled={!selectedDate || !selectedTime}
            onClick={handleBookAppointment}
          >
            Confirm Appointment
          </Button>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;

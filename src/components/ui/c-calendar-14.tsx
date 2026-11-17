"use client";

import { useState } from "react";
import { format, isSameDay } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/c-calendar-14-utils/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Calendar14Props {
  selectedDate?: Date;
  selectedTime?: string | null;
  onSelect?: (date: Date, time: string | null) => void;
}

const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
  const hourNum = Math.floor(i / 2);
  const minuteNum = i % 2 === 0 ? 0 : 30;
  const hour = String(hourNum).padStart(2, "0");
  const minute = String(minuteNum).padStart(2, "0");
  return { hourNum, minuteNum, time: `${hour}:${minute}` };
});

export function Pattern({
  selectedDate,
  selectedTime,
  onSelect,
}: Calendar14Props) {
  const [today] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [internalDate, setInternalDate] = useState<Date>(today);
  const [internalTime, setInternalTime] = useState<string | null>(null);

  const date = selectedDate ?? internalDate;
  const time = selectedTime !== undefined ? selectedTime : internalTime;

  const handleDateChange = (newDate: Date | undefined) => {
    if (!newDate) return;
    setInternalDate(newDate);
    setInternalTime(null);
    onSelect?.(newDate, null);
  };

  const handleTimeChange = (timeSlot: string) => {
    setInternalTime(timeSlot);
    onSelect?.(date, timeSlot);
  };

  return (
    <Card className="w-full overflow-hidden rounded-2xl border-white/[0.08] bg-[#0e1420] p-0">
      <CardContent className="p-0">
        <div className="flex max-sm:flex-col">
          <Calendar
            disabled={[{ before: today }]}
            mode="single"
            onSelect={handleDateChange}
            selected={date}
          />
          <div className="relative w-full max-sm:h-52 sm:flex-1">
            <div className="absolute inset-0 py-4 max-sm:border-t max-sm:border-white/[0.08]">
              <ScrollArea className="h-full sm:border-s sm:border-white/[0.08]">
                <div className="space-y-3">
                  <div className="flex h-5 shrink-0 items-center px-4">
                    <p className="text-sm font-medium text-white">
                      {format(date, "EEEE, d")}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 px-4">
                    {TIME_SLOTS.map(({ hourNum, minuteNum, time: timeSlot }) => {
                      const now = new Date();
                      const isToday = isSameDay(date, now);
                      const slotDate = new Date(date);
                      slotDate.setHours(hourNum, minuteNum, 0, 0);
                      const available = !isToday || slotDate.getTime() > now.getTime();

                      return (
                        <Button
                          className="w-full cursor-pointer font-mono text-xs"
                          disabled={!available}
                          key={timeSlot}
                          onClick={() => handleTimeChange(timeSlot)}
                          size="sm"
                          type="button"
                          variant={time === timeSlot ? "default" : "outline"}
                        >
                          {timeSlot}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default Pattern;

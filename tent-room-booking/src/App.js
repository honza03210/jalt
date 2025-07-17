import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

const TENTS = Array.from({ length: 15 }, (_, i) => ({ id: `Tent ${i + 1}`, capacity: 2, booked: 0 }));
const ROOMS = Array.from({ length: 5 }, (_, i) => ({ id: `Room ${String.fromCharCode(65 + i)}`, capacity: 1, booked: 0 }));

export default function TentRoomBooking() {
  const [tents, setTents] = useState(TENTS);
  const [rooms, setRooms] = useState(ROOMS);
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleBooking = (type, id) => {
    if (type === "tent") {
      setTents((prev) =>
        prev.map((t) =>
          t.id === id && t.booked < t.capacity
            ? { ...t, booked: t.booked + 1 }
            : t
        )
      );
    } else {
      setRooms((prev) =>
        prev.map((r) =>
          r.id === id && r.booked < r.capacity
            ? { ...r, booked: r.booked + 1 }
            : r
        )
      );
    }
    setSelected({ type, id });
    setSaved(false);
  };

  const saveToFile = () => {
    if (!selected) return;
    const text = `Selected: ${selected.id} (${selected.type})\n`;
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "booking.txt";
    a.click();
    setSaved(true);
  };

  const renderCard = (item, type) => {
    const available = item.booked < item.capacity;
    return (
      <Card
        key={item.id}
        className={`p-4 m-2 w-40 cursor-pointer hover:shadow-xl transition ${!available && "opacity-50"}`}
        onClick={() => available && handleBooking(type, item.id)}
      >
        <CardContent className="flex flex-col items-center">
          <div className="text-lg font-semibold">{item.id}</div>
          <div className="text-sm text-gray-600">
            {item.booked}/{item.capacity} booked
          </div>
          <div className="mt-2">
            {available ? (
              <CheckCircle className="text-green-500" />
            ) : (
              <XCircle className="text-red-500" />
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Choose Tent or Room</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Tents (2 kids each)</h2>
        <div className="flex flex-wrap">
          {tents.map((tent) => renderCard(tent, "tent"))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Rooms (1 kid each)</h2>
        <div className="flex flex-wrap">
          {rooms.map((room) => renderCard(room, "room"))}
        </div>
      </div>

      {selected && (
        <div className="mt-6 text-center text-lg">
          ✅ You selected: <strong>{selected.id}</strong> ({selected.type})
          <div className="mt-4">
            <Button onClick={saveToFile}>Save Selection to File</Button>
            {saved && <p className="text-green-600 mt-2">✔ File downloaded</p>}
          </div>
        </div>
      )}
    </div>
  );
}

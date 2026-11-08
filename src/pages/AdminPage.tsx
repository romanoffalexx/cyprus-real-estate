import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Excursion {
  id: number;
  name: string;
  image: string;
}

export default function AdminPage() {
  const [excursions, setExcursions] = useState<Excursion[]>(() => {
    const saved = localStorage.getItem('excursions');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Dresden', image: '/images/excursion-berlin.jpg' },
      { id: 2, name: 'Berlin', image: '/images/excursion-berlin.jpg' },
      { id: 3, name: 'Paris', image: '/images/excursion-paris.jpg' },
      { id: 4, name: 'Wien', image: '/images/excursion-budapest.jpg' },
      { id: 5, name: 'Budapest', image: '/images/excursion-budapest.jpg' },
      { id: 6, name: 'Bratislava', image: '/images/excursion-paris.jpg' },
      { id: 7, name: 'оз. Гарда', image: '/images/excursion-lake-garda.jpg' },
    ];
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    localStorage.setItem('excursions', JSON.stringify(excursions));
  }, [excursions]);

  const addExcursion = () => {
    if (!newName.trim()) return;
    const newExcursion: Excursion = {
      id: Date.now(),
      name: newName,
      image: '/images/excursion-berlin.jpg',
    };
    setExcursions([...excursions, newExcursion]);
    setNewName('');
  };

  const deleteExcursion = (id: number) => {
    setExcursions(excursions.filter((e) => e.id !== id));
  };

  const updateExcursion = (id: number, name: string) => {
    setExcursions(excursions.map((e) => (e.id === id ? { ...e, name } : e)));
    setEditingId(null);
  };

  return (
    <div className="py-12 bg-cyprus-sand min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-cyprus-navy mb-8">
          Админ-панель: Управление экскурсиями
        </h1>
        <div className="bg-white rounded-xl p-8 shadow-card max-w-4xl">
          {/* Add new */}
          <div className="flex gap-4 mb-8">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Название экскурсии"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyprus-navy"
            />
            <button
              onClick={addExcursion}
              className="bg-cyprus-orange text-white px-6 py-3 rounded-lg hover:bg-cyprus-orange/90 transition-colors font-medium inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Добавить
            </button>
          </div>

          {/* List */}
          <div className="space-y-4">
            {excursions.map((excursion) => (
              <div key={excursion.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <img src={excursion.image} alt={excursion.name} className="w-16 h-16 object-cover rounded" />
                {editingId === excursion.id ? (
                  <input
                    type="text"
                    defaultValue={excursion.name}
                    onBlur={(e) => updateExcursion(excursion.id, e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && updateExcursion(excursion.id, (e.target as HTMLInputElement).value)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-cyprus-navy"
                    autoFocus
                  />
                ) : (
                  <span className="flex-1 font-medium text-gray-800">{excursion.name}</span>
                )}
                <button
                  onClick={() => setEditingId(excursion.id)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteExcursion(excursion.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

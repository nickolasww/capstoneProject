import { Link } from 'react-router-dom';

export default function CreateExamplePage() {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create Example</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Enter description"
              />
            </div>
            <div className="flex gap-4">
              <button 
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Create
              </button>
              <Link 
                to="/examples"
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition text-center leading-8"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

const attendees = [
  { id: 1, name: "Omar Haddad", company: "Palmgate Logistics", jobTitle: "Operations Manager", city: "Dubai", session: "Leading Teams", status: "Attended", registeredOn: "2026-10-12" },
  { id: 2, name: "Layla Mansour", company: "Saltwater Media", jobTitle: "HR Director", city: "Abu Dhabi", session: "Trust at Work", status: "Registered" },
  { id: 3, name: "Khalid Rahman", company: "Harbor Lane Bank", jobTitle: "Team Lead", city: "Riyadh", session: "Leading Teams", status: "Cancelled", registeredOn: "2026-10-12"},
  { id: 4, name: "Noura Saleh", company: "Dune & Co", jobTitle: "Project Manager", city: "Dubai", session: "Trust at Work", status: "Attended", registeredOn: "2026-10-15"},
  { id: 5, name: "Faisal Qasim", company: "Palmgate Logistics", jobTitle: "Supervisor", city: "Doha", session: "Leading Teams", status: "Attended" },
  { id: 6, name: "Mariam Yousef", company: "Saltwater Media", jobTitle: "Marketing Lead", city: "Abu Dhabi", session: "Trust at Work", status: "Registered" },
];

function FilterBar({ searchText, setSearchText }) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="grid">
        <label htmlFor="search">Search</label>
        <input className="border border-gray-300 p-1 rounded-xl focus-visible:border-gray-500" id="search" type="text" placeholder="Search by name or company" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
      </div>
      <div className="grid">
        <label htmlFor="city-filter">City</label>
        <select id="city-filter" className="border border-gray-300 p-1 rounded-xl focus-visible:border-gray-500">
          <option>All</option>
          <option>Dubai</option>
          <option>Abu Dhabi</option>
          <option>Riyadh</option>
          <option>Doha</option>
        </select>
      </div>
      <div className="grid">
        <label htmlFor="session-filter">Session</label>
        <select id="session-filter" className="border border-gray-300 p-1 rounded-xl focus-visible:border-gray-500">
          <option>All</option>
          <option>Leading Teams</option>
          <option>Trust at Work</option>
        </select>
      </div>
      <div className="grid">
        <label htmlFor="status-filter" >Status</label>
        <select id="status-filter" className="border border-gray-300 p-1 rounded-xl focus-visible:border-gray-500">
          <option>All</option>
          <option>Attended</option>
          <option>Registered</option>
          <option>Cancelled</option>
        </select>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="p-4 border border-gray-300 rounded-xl">
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-xl font-bold">{value}</div>
    </div>
  );
}

function HeadlineNumbers({ attendees }) {

  const totalRegistered = attendees.length;
  const attended = attendees.filter(attendee => attendee.status === 'Attended').length;
  const cancelled = attendees.filter(attendee => attendee.status === 'Cancelled').length;
  const attendanceRate = Math.round(attended / totalRegistered * 100);


  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard label="Total Registered" value={totalRegistered}/>
      <StatCard label="Attended" value={attended}/>
      <StatCard label="Cancelled" value={cancelled}/>
      <StatCard label="Attendance rate" value={attendanceRate + "%"}/>
    </div>
  );
}

function AttendeeTable({ attendees, searchText }) {
  const filteredAttendees = attendees.filter(attendee => 
    attendee.name.toLowerCase().includes(searchText.toLowerCase()) || attendee.company.toLowerCase().includes(searchText.toLowerCase()))

  const rows = filteredAttendees.map(attendee =>
    <tr key={attendee.id} className="hover:bg-gray-100">
      <td className="px-4 py-2">{attendee.name}</td>
      <td className="px-4 py-2">{attendee.company}</td>
      <td className="px-4 py-2">{attendee.jobTitle}</td>
      <td className="px-4 py-2">{attendee.city}</td>
      <td className="px-4 py-2">{attendee.session}</td>
      <td className="px-4 py-2">{attendee.status}</td>
      <td className="px-4 py-2">{attendee.registeredOn}</td>
    </tr>
  );

  return (
    <table>
      <thead>
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Company</th>
          <th className="px-4 py-2 text-left">Job Title</th>
          <th className="px-4 py-2 text-left">City</th>
          <th className="px-4 py-2 text-left">Session</th>
          <th className="px-4 py-2 text-left">Status</th>
          <th className="px-4 py-2 text-left">Registered on</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default function App() {
  const [searchText, setSearchText] = useState('');
  
  return (
  <div className="flex flex-col gap-4 p-4">
    <h1 className="text-3xl font-bold">Welcome to the dashboard</h1>
    <HeadlineNumbers attendees={attendees}/>
    <FilterBar searchText={searchText} setSearchText={setSearchText}/>
    <AttendeeTable attendees={attendees} searchText={searchText}/>
  </div>
  );
}
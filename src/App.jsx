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
    <div>
      <div>
        <label htmlFor="search">Search</label>
        <input id="search" type="text" placeholder="Search by name or company" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="city-filter">City</label>
        <select id="city-filter">
          <option>All</option>
          <option>Dubai</option>
          <option>Abu Dhabi</option>
          <option>Riyadh</option>
          <option>Doha</option>
        </select>
      </div>
      <div>
        <label htmlFor="session-filter">Session</label>
        <select id="session-filter">
          <option>All</option>
          <option>Leading Teams</option>
          <option>Trust at Work</option>
        </select>
      </div>
      <div>
        <label htmlFor="status-filter">Status</label>
        <select id="status-filter">
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
    <div>
        <div>{label}</div>
        <div>{value}</div>
    </div>
  );
}

function HeadlineNumbers({ attendees }) {

  const totalRegistered = attendees.length;
  const attended = attendees.filter(attendee => attendee.status === 'Attended').length;
  const cancelled = attendees.filter(attendee => attendee.status === 'Cancelled').length;
  const attendanceRate = Math.round(attended / totalRegistered * 100);


  return (
    <div>
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
    <tr key={attendee.id}>
      <td>{attendee.name}</td>
      <td>{attendee.company}</td>
      <td>{attendee.jobTitle}</td>
      <td>{attendee.city}</td>
      <td>{attendee.session}</td>
      <td>{attendee.status}</td>
      <td>{attendee.registeredOn}</td>
    </tr>
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Company</th>
          <th>Job Title</th>
          <th>City</th>
          <th>Session</th>
          <th>Status</th>
          <th>Registered on</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default function App() {
  const [searchText, setSearchText] = useState('');
  
  return (
  <div>
    <h1 className="text-3xl font-bold">Welcome to the dashboard</h1>
    <HeadlineNumbers attendees={attendees}/>
    <FilterBar searchText={searchText} setSearchText={setSearchText}/>
    <AttendeeTable attendees={attendees} searchText={searchText}/>
  </div>
  );
}
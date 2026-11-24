  import { useState } from "react";
  import Papa from 'papaparse';

  const sampleAttendees = [
    { id: 1, name: "Omar Haddad", company: "Palmgate Logistics", jobTitle: "Operations Manager", city: "Dubai", session: "Leading Teams", status: "Attended", registeredOn: "2026-10-12" },
    { id: 2, name: "Layla Mansour", company: "Saltwater Media", jobTitle: "HR Director", city: "Abu Dhabi", session: "Trust at Work", status: "Registered" },
    { id: 3, name: "Khalid Rahman", company: "Harbor Lane Bank", jobTitle: "Team Lead", city: "Riyadh", session: "Leading Teams", status: "Cancelled", registeredOn: "2026-10-12"},
    { id: 4, name: "Noura Saleh", company: "Dune & Co", jobTitle: "Project Manager", city: "Dubai", session: "Trust at Work", status: "Attended", registeredOn: "2026-10-15"},
    { id: 5, name: "Faisal Qasim", company: "Palmgate Logistics", jobTitle: "Supervisor", city: "Doha", session: "Leading Teams", status: "Attended" },
    { id: 6, name: "Mariam Yousef", company: "Saltwater Media", jobTitle: "Marketing Lead", city: "Abu Dhabi", session: "Trust at Work", status: "Registered" },
  ];

  function UploadArea({ setAttendees, uploadError, setUploadError }) {
      async function handleFileUpload(e) {
      const file = e.target.files[0];
      if(!file) return;

      if (!file.name.toLowerCase().endsWith(".csv")) {
        setUploadError(`${file.name} isn't a CSV. Save it as CSV and upload it again.`);
        return;
      }

      const text = await file.text();
      const result = Papa.parse(text, { header: true, skipEmptyLines: true });

      const rows = result.data.map((row, i) => ({ ...row, id: i + 1 }));

      if (rows.length === 0) {
        setUploadError(`${file.name} has no attendees in it. Check that it has a header row and at least one attendee, then upload it again.`);
        return;
      }
      
      const requiredColumns = [
        "name",
        "company",
        "jobTitle",
        "city",
        "session",
        "status",
      ];

      const missing = requiredColumns.filter(column => !result.meta.fields.includes(column));
      
      if (missing.length > 0) {
        setUploadError(`${file.name} is missing these columns: ${missing.join(', ')}. Add them and upload it again.`);
        return;
      }

      setUploadError(null)
      setAttendees(rows);
    }
    
    return (
    <div className="grid">
      <label htmlFor="upload">Choose file to upload</label>
      <input className="" id="upload" type="file" accept=".csv" onChange={handleFileUpload}/>
      {uploadError && <div>{uploadError}</div>}
    </div>
    )
  }

  function FilterBar({attendees, searchText, setSearchText, cityFilter, setCityFilter, sessionFilter, setSessionFilter, statusFilter, setStatusFilter }) {
    
      const cities = attendees.map(attendee => attendee.city)
      const citiesOptions = Array.from(new Set(cities)).sort()    
    
    return (
      <div className="flex flex-wrap gap-4">
        <div className="grid">
          <label htmlFor="search">Search</label>
          <input className="border border-gray-300 p-1 rounded-xl focus-visible:border-gray-500" id="search" type="text" placeholder="Search by name or company" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
        </div>
        <div className="grid">
          <label htmlFor="city-filter">City</label>
          <select id="city-filter" className="border border-gray-300 p-1 rounded-xl focus-visible:border-gray-500" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
            <option>All</option>
            {citiesOptions.map(city => <option key={city}>{city}</option>)}
          </select>
        </div>
        <div className="grid">
          <label htmlFor="session-filter">Session</label>
          <select id="session-filter" className="border border-gray-300 p-1 rounded-xl focus-visible:border-gray-500" value={sessionFilter} onChange={(e) => setSessionFilter(e.target.value)}>
            <option>All</option>
            <option>Leading Teams</option>
            <option>Trust at Work</option>
          </select>
        </div>
        <div className="grid">
          <label htmlFor="status-filter" >Status</label>
          <select id="status-filter" className="border border-gray-300 p-1 rounded-xl focus-visible:border-gray-500" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
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

  function AttendeeTable({ attendees, searchText, cityFilter, sessionFilter, statusFilter}) {

    const filteredAttendees = attendees.filter(attendee => {
      const matchesSearch = attendee.name.toLowerCase().includes(searchText.toLowerCase()) || attendee.company.toLowerCase().includes(searchText.toLowerCase());
      const matchesCity = cityFilter === "All" || attendee.city === cityFilter;
      const matchesSession = sessionFilter === "All" || attendee.session === sessionFilter;
      const matchesStatus = statusFilter === "All" || attendee.status === statusFilter;

      return matchesSearch && matchesCity && matchesSession && matchesStatus;
    });

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
    const [cityFilter, setCityFilter] = useState('All');
    const [sessionFilter, setSessionFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [attendees, setAttendees] = useState(sampleAttendees);
    const [uploadError, setUploadError] = useState(null)
    
    return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold">Welcome to the dashboard</h1>
      <UploadArea setAttendees={setAttendees} uploadError={uploadError} setUploadError={setUploadError}/>
      <HeadlineNumbers attendees={attendees}/>
      <FilterBar attendees={attendees} searchText={searchText} setSearchText={setSearchText} cityFilter={cityFilter} setCityFilter={setCityFilter} sessionFilter={sessionFilter} setSessionFilter={setSessionFilter} statusFilter={statusFilter} setStatusFilter={setStatusFilter}/>
      <AttendeeTable attendees={attendees} searchText={searchText} cityFilter={cityFilter} sessionFilter={sessionFilter} statusFilter={statusFilter}/>
    </div>
    );
  }
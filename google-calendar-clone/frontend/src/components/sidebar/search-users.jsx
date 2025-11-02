import { HiOutlineUsers } from 'react-icons/hi';

export default function SearchUsers() {
  return (
    <div className="position-relative mb-3">
      <HiOutlineUsers className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" style={{ fontSize: '16px' }} />
      <input
        type="search"
        className="form-control ps-5 bg-light border-0"
        placeholder="Search for people"
      />
    </div>
  );
}


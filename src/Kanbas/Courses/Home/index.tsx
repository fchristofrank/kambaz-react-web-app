import Modules from "../Modules";
import CourseStatus from "./Status";
export default function Home() {
  return (
    <div className="d-flex">
      <div className="flex-grow-1 me-5" style={{ width: '70%' }}>
        <Modules />
      </div>
      <div className="d-none d-xl-block mt-4" style={{ width: '30%' }}>
        <CourseStatus />
      </div>
    </div>
  );
}

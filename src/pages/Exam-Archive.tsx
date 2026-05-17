import { useNavigate } from "react-router-dom";
import { useExamArchives } from "../features/exam-archive/hooks/useExamArchives";
import Card from "../components/ui/Card";

const ExamArchive = () => {
  const navigate = useNavigate();
  const { data } = useExamArchives();

  return (
    <div className="p-20">
      <h1>시험 자료</h1>

      <div className="mt-10 grid gap-5 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {data.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            description={item.description}
            onClick={() => navigate(`/exam-archive/${item.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExamArchive;

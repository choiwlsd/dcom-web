import { useNavigate } from "react-router-dom";
import { useExamArchives } from "../features/exam-archive/hooks/useExamArchives";
import Input from "../components/ui/Input";
import { IoSearchOutline } from "react-icons/io5";
import { HiUpload } from "react-icons/hi";
import { Button } from "../components/ui/Button";

const ExamArchive = () => {
  const navigate = useNavigate();
  // 전체 목록 게시글 조회
  const { data } = useExamArchives();

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-20">

      <section className="mb-10">
        <h1 className="text-xl font-bold text-[#4988C4]">
          족보 아카이브
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          선배들이 남긴 귀중한 전공 자료를 확인해보세요.
        </p>
      </section>

      <section className="mb-12 flex items-center justify-between">
          <div className="relative w-[450px]">
            <Input
              placeholder="검색어를 입력하세요"
              className="text-sm"
            />

            <IoSearchOutline
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-400
                cursor-pointer
              "
              size={18}
              onClick={() => {}}
            />
          </div>

          <Button
            variant="third"
            className="flex items-center justify-center gap-2 w-[120px] text-sm"
          >
            <HiUpload />
            UPLOAD
          </Button>
        </section>

      <section>
          <h2 className="mb-4 text-lg font-semibold">
            최근 업로드된 족보
          </h2>

          <div className="overflow-hidden ">
            <table className="w-full">
              <thead>
                <tr className="border-b border-t-2 border-black">
                  <th className="px-5 py-4 text-sm font-medium">
                    과목명
                  </th>

                  <th className="px-5 py-4 text-sm font-medium">
                    교수명
                  </th>

                  <th className="px-5 py-4 text-sm font-medium">
                    최근 수정일
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr
                    key={item.id}
                    className="cursor-pointer border-b hover:bg-gray-50 text-center"
                  >
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2">
                        <span>{item.subject}</span>

                        <span className="text-sm text-[#4988C4]">
                          [{item.count}]
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-5 text-sm text-gray-700">
                      {item.professor}
                    </td>

                    <td className="px-5 py-5 text-sm text-gray-500">
                      {item.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
    </div>
  );
};

export default ExamArchive;

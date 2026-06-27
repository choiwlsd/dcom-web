import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { HiUpload } from "react-icons/hi";
import { MdAttachFile } from "react-icons/md";

import { Button } from "../../components/ui/Button";
import DataTable, { type DataTableColumn } from "../../components/ui/DataTable";
import SearchBar from "../../components/ui/SearchBar";
import useAuth from "../../features/auth/hooks/useAuth";
import { useNotices } from "../../features/notice/hooks/useNotices";
import type { NoticeType } from "../../features/notice/types/notice.type";

const NOTICE_TEXT = {
  pageTitle: "공지사항",
  description: "D.COM 내의 공지사항을 확인해보세요.",
  number: "번호",
  title: "제목",
  author: "작성자",
  date: "작성일",
  empty: "등록된 공지사항이 없습니다.",
  searchPlaceholder: "검색어를 입력하세요",
};

const Notice = () => {
  const navigate = useNavigate();
  const { data: notices } = useNotices();
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === "ADMIN";
  const [searchKeyword, setSearchKeyword] = useState("");
  const [appliedKeyword, setAppliedKeyword] = useState("");

  const filteredNotices = useMemo(() => {
    const keyword = appliedKeyword.trim().toLowerCase();

    if (!keyword) {
      return notices ?? [];
    }

    return (notices ?? []).filter(
      (notice) =>
        notice.title.toLowerCase().includes(keyword) ||
        notice.author.name.toLowerCase().includes(keyword),
    );
  }, [notices, appliedKeyword]);

  const columns: DataTableColumn<NoticeType>[] = [
    {
      key: "id",
      header: NOTICE_TEXT.number,
      width: "w-[8%]",
      cellClassName: "text-sm text-gray-500",
      render: (notice) => notice.id,
    },
    {
      key: "title",
      header: NOTICE_TEXT.title,
      width: "w-[55%]",
      headerClassName: "text-left",
      cellClassName: "text-left",
      render: (notice) => (
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <span className="truncate font-medium text-gray-800">
            {notice.title}
          </span>

          {notice.hasAttachment && (
            <MdAttachFile className="text-gray-400" />
          )}
        </div>
      ),
    },
    {
      key: "author",
      header: NOTICE_TEXT.author,
      width: "w-[20%]",
      cellClassName: "truncate text-sm text-gray-600",
      render: (notice) => notice.author.name,
    },
    {
      key: "date",
      header: NOTICE_TEXT.date,
      width: "w-[17%]",
      cellClassName: "truncate text-sm text-gray-500",
      render: (notice) => notice.date,
    },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-20">
      <section className="mb-10">
        <h1 className="text-xl font-bold text-[#4988C4]">
          {NOTICE_TEXT.pageTitle}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {NOTICE_TEXT.description}
        </p>
      </section>

      <section className="mb-12 flex items-center justify-between gap-4">
        <SearchBar
          value={searchKeyword}
          onChange={setSearchKeyword}
          onSearch={() => setAppliedKeyword(searchKeyword)}
          placeholder={NOTICE_TEXT.searchPlaceholder}
        />

        {isAdmin && (
          <Button
            variant="third"
            className="flex w-40 items-center justify-center gap-2 text-sm"
            onClick={() => navigate("/notice/upload")}
          >
            <HiUpload />
            UPLOAD
          </Button>
        )}
      </section>

      <section>
        <DataTable
          columns={columns}
          data={filteredNotices}
          rowKey={(notice) => notice.id}
          emptyMessage={NOTICE_TEXT.empty}
          onRowClick={(notice) => navigate(`/notice/${notice.id}`)}
        />
      </section>
    </div>
  );
};

export default Notice;

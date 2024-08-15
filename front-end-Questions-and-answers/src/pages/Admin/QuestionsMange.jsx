import useSWR from "swr";
import CreateQuestion from "../../components/CreateQuestion";
import AdminPanelLayout from "../../components/layouts/sidebar/AdminPanelLayout";
import MyTable from "../../components/ui/MyTable";
import MyErrorMessage from "../../components/ui/MyErrorMessage";
import MyLoadingMessage from "../../components/ui/MyLoadingMessage";
import { useState } from "react";
import callApi from "../../utils/callApi";
import DeleteDialog from "../../components/ui/DeleteDialog";
import MyToast from "../../utils/myToast";

const fetcher = (url) =>
  callApi()
    .get(url)
    .then((res) => res.data);

const QuestionsMange = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const { data, error, mutate } = useSWR(`/question?page=${page}`, fetcher);

  if (error) {
    return (
      <AdminPanelLayout>
        <MyErrorMessage />
      </AdminPanelLayout>
    );
  }

  if (!data) {
    return (
      <AdminPanelLayout>
        <MyLoadingMessage />
      </AdminPanelLayout>
    );
  }

  const onPageChangeHandler = (selectedPage) => {
    const newPage = Number(selectedPage.selected) + 1;
    if (page !== newPage) {
      setPage(newPage);
    }
  };

  const { data: items, totalPages } = data;

  const onEditHandler = (item) => {
    setSelectedQuestion(item);
    console.log(item);
    setIsOpen(true);
  };
  const onDeleteHandler = (item) => {
    setSelectedQuestion(item);
    console.log(item);
    setIsOpenDelete(true);
  };
  const deleteHandler = async () => {
    try {
      const result = await callApi().delete(`/question/${selectedQuestion.id}`);
      if (result.status === 200) {
        setIsOpenDelete(false);
        MyToast(result.data.message);
        mutate();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const columns = items.map((item) => ({
    question: item.question || "",
    firstAnswer: item.answers[0] || "",
    secondAnswer: item.answers[1] || "",
    thirdAnswer: item.answers[2] || "",
    id: item._id,
  }));

  const theadList = [
    { id: 1, name: "سوال" },
    { id: 2, name: "جواب اول" },
    { id: 3, name: "جواب دوم" },
    { id: 4, name: "جواب سوم" },
  ];

  return (
    <AdminPanelLayout>
      <CreateQuestion
        mutate={mutate}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        ques={selectedQuestion?.question || ""}
        first={selectedQuestion?.firstAnswer || ""}
        second={selectedQuestion?.secondAnswer || ""}
        third={selectedQuestion?.thirdAnswer || ""}
        id={selectedQuestion?.id}
      />
      <div className="pt-8" />
      <MyTable
        rows={theadList}
        columns={columns}
        onPageChangeHandler={onPageChangeHandler}
        page={page}
        pageCount={totalPages}
        onEdit={onEditHandler}
        onDelete={onDeleteHandler}
      />
      <DeleteDialog
        open={isOpenDelete}
        close={() => setIsOpenDelete(false)}
        deleteHandler={deleteHandler}
      />
    </AdminPanelLayout>
  );
};

export default QuestionsMange;

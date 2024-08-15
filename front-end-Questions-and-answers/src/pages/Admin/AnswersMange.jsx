import { useState } from "react";
import useSWR from "swr";
import AdminPanelLayout from "../../components/layouts/sidebar/AdminPanelLayout";
import MyTable from "../../components/ui/MyTable";
import MyDialog from "../../components/ui/MyDialog";
import callApi from "../../utils/callApi";
import MyErrorMessage from "../../components/ui/MyErrorMessage";
import MyLoadingMessage from "../../components/ui/MyLoadingMessage";
import DeleteDialog from "../../components/ui/DeleteDialog";
import MyToast from "../../utils/myToast";

const fetcher = (url) =>
  callApi()
    .get(url)
    .then((res) => res.data);

const AnswersMange = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(null);
  const [selectedDelete, setSelectedDelete] = useState(null);
  const [page, setPage] = useState(1);

  const { data, error, mutate } = useSWR(`/answer?page=${page}`, fetcher);

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

  const { data: items, totalPages, totalItems, totalGenders } = data;

  const onSeeHandler = (item) => {
    const answers = item.answers;
    setSelectedAnswers(answers);
    setIsOpen(true);
  };

  const onDeleteHandler = (item) => {
    const answers = item.id;
    setSelectedDelete(answers);
    setIsOpenDelete(true);
  };

  const deleteHandler = async () => {
    try {
      const result = await callApi().delete(`/answer/${selectedDelete}`);
      if (result.status === 200) {
        setIsOpenDelete(false);
        MyToast(result.data.message);
        mutate();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const onPageChangeHandler = (selectedPage) => {
    const newPage = Number(selectedPage.selected) + 1;
    if (page !== newPage) {
      setPage(newPage);
    }
  };

  const columns = items.map((item) => ({
    name: item.userInformation.name || "",
    age: item.userInformation.age || "",
    gender: item.userInformation.gender || "",
    answers: JSON.parse(item.answers),
    id: item._id,
  }));

  const theadList = [
    { id: 1, name: "نام" },
    { id: 2, name: "سن" },
    { id: 3, name: "جنسیت" },
  ];

  const detail = [
    { id: 1, name: "تعداد شرکت کنندگان", value: totalItems },
    { id: 2, name: "تعداد شرکت کنندگان آقا", value: totalGenders?.male },
    { id: 3, name: "تعداد شرکت کنندگان خانم", value: totalGenders.female },
  ];

  return (
    <AdminPanelLayout>
      {data && (
        <>
          <div className="text-gray-200 flex gap-6 justify-between flex-wrap pb-6">
            {detail.map((item) => (
              <div
                key={item.id}
                className="flex justify-between rounded-lg px-6 py-5 w-full lg:w-72  border border-purple-600 bg-purple-950 text-white hover:bg-purple-700 "
              >
                <span>{item.name}</span>
                <span className=" font-bold bg-gray-900 p-4 border border-purple-400 rounded-full w-8 h-8 flex justify-center items-center">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <MyDialog
            open={isOpen}
            close={() => setIsOpen(false)}
            title="پاسخ ها"
            btn={true}
          >
            <div className="py-5 divide-y-2 divide-dashed divide-purple-400">
              {selectedAnswers?.map((item, index) => (
                <div key={index} className="flex justify-between py-4">
                  <div className="font-bold text-gray-300">{item.question}</div>
                  <div className="font-bold text-gray-100">{item.answer}</div>
                </div>
              ))}
            </div>
          </MyDialog>
          <DeleteDialog
            open={isOpenDelete}
            close={() => setIsOpenDelete(false)}
            deleteHandler={deleteHandler}
          />

          <MyTable
            rows={theadList}
            columns={columns}
            onPageChangeHandler={onPageChangeHandler}
            page={page}
            pageCount={totalPages}
            onSee={onSeeHandler}
            onDelete={onDeleteHandler}
          />
        </>
      )}
    </AdminPanelLayout>
  );
};

export default AnswersMange;

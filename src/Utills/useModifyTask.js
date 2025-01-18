import { useDispatch, useSelector } from "react-redux";
import {
  updateItemtoTodo,
  updateItemInProgress,
  updateItemtoCompleted,
} from "../Redux/Slicers/taskBuddySlicer";

const useModifyTask = () => {
  const dispatch = useDispatch();
  const todoDataItems = useSelector((store) => store?.taskBuddySlicer?.todo);
  const inProgess = useSelector((store) => store?.taskBuddySlicer?.inProgess);
  const completed = useSelector((store) => store?.taskBuddySlicer?.completed);

  const modifyTask = (type, item) => {
    const { todoUpdatedItems, InprogressUpdatedItems, completedUpdatedItems } =
      filterData(item);

    if (type === "Delete") {
      dispatch(updateItemtoTodo(todoUpdatedItems));
      dispatch(updateItemInProgress(InprogressUpdatedItems));
      dispatch(updateItemtoCompleted(completedUpdatedItems));
    } else if (type === "Edit") {
      console.log(item?.taskStatus, "edi");
      if (item?.taskStatus?.toLowerCase() === "to_do") {
        const updated = [...todoUpdatedItems, item];

        dispatch(updateItemtoTodo(updated));
        dispatch(updateItemInProgress(InprogressUpdatedItems));
      } else if (item?.taskStatus?.toLowerCase() === "in_progress") {
        const updated = [...InprogressUpdatedItems, item];
        dispatch(updateItemtoTodo(todoUpdatedItems));
        dispatch(updateItemInProgress(updated));
      } else if (item?.taskStatus?.toLowerCase() === "completed") {
        const updated = [...completedUpdatedItems, item];
        dispatch(updateItemtoTodo(todoUpdatedItems));
        dispatch(updateItemInProgress(InprogressUpdatedItems));
        dispatch(updateItemtoCompleted(updated));
      } else {
        console.log("error");
      }
    }
  };

  const filterData = (item) => {
    const todoUpdatedItems = todoDataItems.filter((ele) => item?.id !== ele.id);
    const InprogressUpdatedItems = inProgess.filter(
      (ele) => item?.id !== ele.id
    );
    const completedUpdatedItems = completed.filter(
      (ele) => item?.id !== ele.id
    );
    return { todoUpdatedItems, InprogressUpdatedItems, completedUpdatedItems };
  };

  return modifyTask;
};

export default useModifyTask;

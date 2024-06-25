import useModal from "@/hooks/useModal";
import Spacing from "@/components/Spacing";
import { MODAL_KEY } from "@/utils/const";
import AddModal from "@/components/AddModal";
import CreateModal from "@/components/CreateModal";
import useTodo from "@/hooks/useTodo";
import TodoList from "@/containers/TodoList";
import ModifyModal from "@/components/ModifyModal";

function Home() {
  const [onOpen] = useModal((state) => [state.onOpen]);

  const [reset] = useTodo((state) => [state.reset]);

  const handleClickAdd = () => {
    onOpen(MODAL_KEY.ADD_TODO);
  };

  return (
    <>
      <div className="my-8 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">현우의 TODO 애플리케이션</h1>
        <Spacing height={32} />
        <div className="flex flex-col items-center">
          <div className="flex justify-center gap-10">
            <button className="text-xl font-bold" onClick={handleClickAdd}>
              추가하기
            </button>
            <button className="text-xl font-bold" onClick={reset}>
              초기화하기
            </button>
          </div>

          <Spacing height={32} />

          <TodoList />
        </div>
      </div>
      <CreateModal id={MODAL_KEY.ADD_TODO}>
        <AddModal />
      </CreateModal>
      <CreateModal id={MODAL_KEY.MODIFY_TODO}>
        <ModifyModal />
      </CreateModal>
    </>
  );
}

export default Home;

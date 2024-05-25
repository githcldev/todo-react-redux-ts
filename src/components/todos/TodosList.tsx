import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, completeTodo,
  fetchTodos, selectTodoIds, selectTodoById, changeView
} from "../../reducers/todo/todoSlice";
import type { RootState } from "../../common/store";
import { Spinner } from "../../common/ui/Spinner";
interface Props { todoId: any; post: any }
const PostExcerpt = ({ todoId, post }: Props) => {
  const dispatch = useDispatch();
  const completed = post.completed ? "completed" : "";
  return (
    <article className="post-excerpt">
      <div>
        <p className={completed}>{post.title}</p>
        <span onClick={() => dispatch(completeTodo(post.id))}>Complete</span>
        <span onClick={() => dispatch(deleteTodo(post))}>Delete</span>
        <span onClick={() => dispatch(changeView({ view: 'edit', value: post }))}>Edit</span>
      </div>
    </article>
  );
};
export const PostsList = () => {
  const dispatch = useDispatch();
  const orderedTodoIds = useSelector((state: RootState) => state.todos.todos);
  const todoStatus = useSelector((state: RootState) => state.todos.status);
  const error = useSelector((state: RootState) => state.todos.error);
  useEffect(() => {
    if (todoStatus === "idle") { dispatch(fetchTodos()); }
  }, [todoStatus, dispatch]);
  let content;
  if (todoStatus === "loading") {
    content = <Spinner text="Loading..." />;
  } else if (todoStatus === "succeeded") {
    content = orderedTodoIds.map((post) => (
      <PostExcerpt post={post} key={post.id} todoId={post.id} />
    ));
  } else if (todoStatus === "failed") {
    content = <div>{error}</div>;
  }
  return (
    <section className="posts-list">
      {content}
    </section>
  );
};

import { api } from "~~/convex/_generated/api";
import type { Id } from "~~/convex/_generated/dataModel";

export function useTasks() {
  const filter = useState("task-filter", () => "all");

  const { data: allTasks } = useConvexQuery(api.tasks.get, {});
  const { data: filteredTasks } = useConvexQuery(
    api.tasks.getByStatus,
    computed(() => ({ isCompleted: filter.value === "completed" })),
  );

  const tasks = computed(
    () => (filter.value === "all" ? allTasks.value : filteredTasks.value) ?? [],
  );

  const createTask = useConvexMutation(api.tasks.create);
  const removeTask = useConvexMutation(api.tasks.remove);
  const updateTask = useConvexMutation(api.tasks.update);

  const toggleStatus = async (id: Id<"tasks">) => {
    const task = tasks.value?.find((t) => t._id === id);
    if (!task) return;
    await updateTask.mutate({
      id,
      text: task.text,
      isCompleted: !task.isCompleted,
    });
  };

  const setFilter = (newFilter: string) => {
    filter.value = newFilter;
  };

  return { filter, tasks, createTask, removeTask, toggleStatus, setFilter };
}

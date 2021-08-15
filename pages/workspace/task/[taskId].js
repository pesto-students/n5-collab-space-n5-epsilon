import { useRouter } from "next/router";
import { getLayout as getSiteLayout } from "../../../src/components/Layouts/SiteLayout";
import SingleTask from "../../../src/components/common/singleTask/SingleTask";
const TaskPage = () => {
  const router = useRouter();
  const { taskId } = router.query;
  return <SingleTask taskId={taskId} />;
};

TaskPage.getLayout = getSiteLayout;

export default TaskPage;

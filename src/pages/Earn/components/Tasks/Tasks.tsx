import './Tasks.scss';
import { TaskItem } from '../TaskItem/TaskItem';
import { getTaskList } from '@/api/task';
import { useEffect, useState } from 'react';
import { initUtils } from '@telegram-apps/sdk';
import JoinTgChannel from '../JoinTgChannel/JoinTgChannel';
import useStore from '@/strore';
import {
  checkTask,
  checkAuth,
  getTwitterAuthUrl,
  finishTask,
} from '@/api/task';
export const Tasks = () => {
  const utils = initUtils();
  const [list, setList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [taskChecking, setTaskChecking] = useState(false);
  const [taskItem, setTaskItem] = useState<any>(null);
  const setEdenToken = useStore((state: any) => state.setEdenToken);
  // 每个人任务列表的对象
  const _getTask = async (item: any) => {
    console.log(item);
    const taskType = item.taskType;
    if (taskType === 2 || taskType === 3) {
      utils.openLink(item.taskUrl);
      setList(
        list.map((v: any) => {
          if (v.id === item.id) {
            return { ...v, loading: true };
          }
          return v;
        })
      );
      setTimeout(async () => {
        await finishTask({ taskId: item.id });
        getTaskList({ pointTypes: [1, 2].join(',') }).then((res: any) => {
          const list = res.map((item: any) => ({
            ...item,
            loading: false,
          }));
          setList(list || []);
          setEdenToken();
        });
      }, 3000);
    }
    if (item.taskType === 5) {
      setOpen(true);
      setTaskItem(item);
    }
  };
  const join = async () => {
    setOpen(false);
    setList(
      list.map((v: any) => {
        if (v.id === taskItem.id) {
          return { ...v, loading: true };
        }
        return v;
      })
    );
    taskItem && utils.openTelegramLink(taskItem.taskUrl);
    setTimeout(async () => {
      await finishTask({ taskId: taskItem.id });
      getTaskList({ pointTypes: [1, 2].join(',') }).then((res: any) => {
        setList(res || []);
      });
      setEdenToken();
    });
  };
  useEffect(() => {
    const data = [1, 2].join(',');
    getTaskList({ pointTypes: data }).then((res: any) => {
      const list = res.map((item: any) => ({
        ...item,
        loading: false,
      }));
      setList(list || []);
    });
  }, []);
  const close = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="e-tasks-wrap">
        {list.map((item: any) => (
          <TaskItem {...item} key={item.id} _getTask={_getTask} />
        ))}
      </div>
      {open ? <JoinTgChannel closeFn={close} join={join} /> : null}
    </>
  );
};

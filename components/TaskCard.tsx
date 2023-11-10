"use client";
import { Task } from "@prisma/client";
import React, { useTransition } from "react";
import { Checkbox } from "./ui/checkbox";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { deleteTask, setTaskToDone } from "@/actions/task";
import { useRouter } from "next/navigation";

import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialogFooter } from "./ui/alert-dialog";

function getExpirationColor(expiresAt: Date) {
  const days = Math.floor(expiresAt.getTime() - Date.now()) / 1000 / 60 / 60;

  if (days < 0) return "text-red-300 dark:text-red-400";

  if (days <= 3 * 24) return "text-gray-500 dark:text-gray-400";
  if (days <= 7 * 24) return "text-emerald-500 dark:text-emerald-400";
  return "text-gree-500 dark:text-green-400";
}

function TaskCard({ task }: { task: Task }) {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  
  const removeTask = async () => {
    try {
      await deleteTask(task.id);
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
      router.refresh();
    } catch (e) {
      toast({
        title: "Error",
        description: "Cannot delete Task",
        variant: "destructive",
      });
    }
  };


    function setShowCreateModal(arg0: boolean): void {
        throw new Error("Function not implemented.");
    }

  return (
    <div className="flex gap-2 items-start justify-between">
        <div className="flex gap-2 items-start ">
            
        <Checkbox
            id={task.id.toString()}
            className="w-5 h-5"
            checked={task.done}
            disabled={task.done || isLoading}
            onCheckedChange={() => {
            startTransition(async () => {
                await setTaskToDone(task.id);
                router.refresh();
            });
            }}
        />
        <label
            htmlFor={task.id.toString()}
            className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoration-1 dark:decoration-white",
            task.done && "line-through"
            )}
        >
            {task.content}
            {task.expiresAt && (
            <p
                className={cn(
                "text-xs text-neutral-500 dark:text-neutral-400",
                getExpirationColor(task.expiresAt)
                )}
            >
                {format(task.expiresAt, "dd/MM/yyyy")}
            </p>
            )}
        </label>
        </div>
      {isLoading && <div>...</div>}
            {!isLoading && (
              <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => {
                startTransition(async () => {
                  await removeTask();
                  router.refresh();
                });
              }}
            >
              <TrashIcon />
            </Button>
            
        )}
    </div>
    
  );
  
}

export default TaskCard;
import { useEffect } from "react";
import Modal from "./Modal";
import { Button } from "./ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { ticketSchema } from "@/lib/zodSchemas/ticketSchema";
import { TicketType } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export default function AddEditTicketModal({
  modalTitle,
  modalDescription = "",
  open,
  onClose,
  selectedTicket,
  mode = "add",
}: {
  modalTitle: string;
  modalDescription?: string;
  open: boolean;
  onClose: () => void;
  selectedTicket?: TicketType;
  mode?: "add" | "edit";
}) {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [status, setStatus] = useState<"open" | "in_progress" | "resolved">(
  //   "open",
  // );
  // const [priority, setPriority] = useState<"1" | "2" | "3" | "4" | "5">("1");
  // const [assignee, setAssignee] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ticketSchema>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "open",
      priority: "1",
      assignee: "",
    },
  });

  useEffect(() => {
    console.log("Selected Ticket: ", selectedTicket);
    if (selectedTicket) {
      reset(selectedTicket);
    } else {
      reset({
        title: "",
        description: "",
        status: "open",
        priority: "1",
        assignee: "",
      });
    }
  }, [selectedTicket, reset, open]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (newTicket: ticketSchema) => {
      const url= mode === "add" ? "/api/tickets" : `/api/tickets/${selectedTicket?._id}`
      console.log("url",url)
      const response = mode === "add" ?  await axios.post(url, newTicket) : await axios.patch(url, newTicket);
      return response.data;
    },
    onSuccess: () => {
      const queryKeyArr= mode === "add" ? ["tickets"] : [`ticketDetails`, selectedTicket?._id]
      
      queryClient.invalidateQueries({ queryKey: queryKeyArr });
      console.log(`Ticket ${mode === "add" ? "created" : "updated"} successfully!`);
      toast.success(`Ticket ${mode === "add" ? "created" : "updated"} successfully!`)
      reset();
      onClose();
    },
    onError: (error) => {
      console.error(`Error ${mode === "add" ? "creating" : "updating"} ticket:`, error);
      toast.error(`Error ${mode === "add" ? "creating" : "updating"} ticket`);
    },
  });

  const onSubmit = (data: ticketSchema) => {
    console.log("Validated Data:", data);
    mutate(data);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title={modalTitle}
        description={modalDescription}
        forceMount={true}
        onEscapeKeyDown={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <div className=" -mx-4 max-h-[70vh] overflow-y-auto px-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                    <Input
                      id="title"
                      placeholder="Sample ticket 1 - Testing infinite scrolling"
                      {...register("title")}
                    />
                    <FieldDescription className="text-xs">
                      Provide a clear and concise title (5-80 characters)
                    </FieldDescription>
                    {errors.title && (
                      <p className="text-red-500 text-xs">
                        {errors.title?.message}
                      </p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <Textarea
                      id="description"
                      placeholder="Describe the isssue"
                      {...register("description")}
                    />
                    <FieldDescription className="text-xs">
                      Provide Detailed Description about the issue (min 20
                      characters)
                    </FieldDescription>
                    {errors.description && (
                      <p className="text-red-500 text-xs">
                        {errors.description?.message}
                      </p>
                    )}
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="status">Status</FieldLabel>
                      <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger id="status">
                              <SelectValue placeholder="Resolved" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="open">Open</SelectItem>
                                <SelectItem value="in_progress">
                                  In Progress
                                </SelectItem>
                                <SelectItem value="resolved">
                                  Resolved
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.status && (
                        <p className="text-red-500 text-xs">
                          {errors.status?.message}
                        </p>
                      )}
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="priority">Priority</FieldLabel>
                      <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger id="priority">
                              <SelectValue placeholder="1" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="1">1-Low</SelectItem>
                                <SelectItem value="2">2-Medium</SelectItem>
                                <SelectItem value="3">3-High</SelectItem>
                                <SelectItem value="4">4-Critical</SelectItem>
                                <SelectItem value="5">5-Urgent</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.priority && (
                        <p className="text-red-500 text-xs">
                          {errors.priority?.message}
                        </p>
                      )}
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel htmlFor="assignee">
                      Assignee (Optional)
                    </FieldLabel>
                    <Input
                      id="assignee"
                      placeholder="User 4"
                      {...register("assignee")}
                    />
                    <FieldDescription className="text-xs">
                      Leave empty if not assigned yet
                    </FieldDescription>
                    {errors.assignee && (
                      <p className="text-red-500 text-xs">
                        {errors.assignee?.message}
                      </p>
                    )}
                  </Field>
                </FieldGroup>
              </FieldSet>
              <Field orientation="horizontal">
                <Button className="cursor-pointer" disabled={isPending} type="submit">
                  {mode === "add"
                    ? isPending
                      ? "Creating Ticket..."
                      : "Create Ticket"
                    : isPending
                      ? "Updating Ticket..."
                      : "Update Ticket"}
                </Button>
                <Button className="cursor-pointer" variant="outline" type="button" onClick={onClose}>
                  Cancel
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </Modal>
    </>
  );
}

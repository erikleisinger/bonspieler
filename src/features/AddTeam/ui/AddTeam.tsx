import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { addTeamToTournament } from "../lib/addTeamToTournament";

import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import Typography from "@/shared/ui/typography";
import { Label } from "@/shared/ui/label";
import { FaPlus } from "react-icons/fa";
import { Tournament } from "@/shared/types/Tournament";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Team name must be at least 2 characters.",
  }),
  teamMembers: z
    .array(
      z.object({
        name: z.string().min(3, "Must be 3 letters or more").optional(),
        email: z.string().email("Invalid email").optional(),
      })
    )
    .nonempty("One team member must be listed"),
});

export default function AddTeam({ tournament }: { tournament: Tournament }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      teamMembers: [
        {
          name: "",
          email: "",
        },
      ],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, teamMembers } = values;
    const team = {
      name,
    };
    addTeamToTournament("2efb9721-29d2-4b59-afa4-46917c7a3c93", {
      team,
      teamMembers,
    });
  }

  const {
    fields: teamMembers,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "teamMembers",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState: { invalid } }) => (
            <FormItem>
              <FormLabel>
                <Typography tag="h4">Team name</Typography>
              </FormLabel>
              <Typography tag="p" className="-mt-2">
                This is your public display name.
              </Typography>
              <FormControl>
                <Input placeholder="shadcn" invalid={invalid} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Typography tag="h4">Team members</Typography>
          <Typography tag="p">
            Please enter the name and email address of each player on your team.{" "}
          </Typography>
        </div>
        <div className="px-4 -mt-4 flex flex-col gap-4">
          {teamMembers.map((field, index) => (
            <div key={field.id} className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name={`teamMembers.${index}.name`}
                render={({ field, fieldState: { invalid } }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex justify-between items-center mb-4">
                        <Label>Team member {index + 1}</Label>
                        {index ? (
                          <Button
                            variant="ghost"
                            className="hover:text-destructive hover:bg-red-50"
                            onClick={() => remove(`teamMembers.${index}`)}
                          >
                            Remove
                          </Button>
                        ) : (
                          <div />
                        )}
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} invalid={invalid} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`teamMembers.${index}.email`}
                render={({ field, fieldState: { invalid } }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="name@email.com"
                        invalid={invalid}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <Button
            className="w-fit text-indigo-500 hover:text-indigo-500 hover:bg-indigo-50 flex items-center"
            variant="ghost"
            onClick={() =>
              append(
                {
                  name: "",
                  email: "",
                },
                {
                  shouldFocus: true,
                }
              )
            }
          >
            <FaPlus />
            Add team member
          </Button>
        </div>

        <footer className="flex justify-center pt-8">
          <Button
            className="w-[300px]"
            type="submit"
            disabled={!form.formState.isValid}
          >
            Submit
          </Button>
        </footer>
      </form>
    </Form>
  );
}

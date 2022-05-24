import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TeamSubmitForm } from "../../@types/teams.d";
import {
  InputLabel,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Button,
} from "@mui/material";

const CreateTeam: React.FC = () => {
  const [leads, setLeads] = useState<[]>();
  const [users, setUsers] = useState<[]>();

  useEffect(() => {
    const fetchLead = async (): Promise<void> => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users`
      );
      const results = await response.json();
      setUsers(results.filter((user: { role: number }) => user.role !== 3));
      setLeads(
        results.filter(
          (user: { teams: []; role: number }) =>
            user.role === 3 && user.teams.length === 0
        )
      );
    };
    fetchLead();
  }, []);

  const { control, handleSubmit } = useForm<TeamSubmitForm>();

  const onSubmit = async (data: TeamSubmitForm): Promise<void> => {
    const datas = {
      name: data.name,
      users: [data.leader, data.intern, data.member]
        .flat()
        .map((userId) => ({ id: userId })),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/team`,
        {
          method: "post",
          headers: new Headers({
            "Content-Type": "application/json",
            Accept: "application/json",
          }),
          body: JSON.stringify({ team: datas }),
        }
      );

      if (response.ok) {
        window.location.reload();
      } else {
        alert("name already taken !");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const wFull = { width: "100%" };
  return (
    <section className="col-2">
      <div className="d-flex pb-4 pt-2 align-items-center">
        <b>Create Team</b>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <Controller
            name="name"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <FormControl sx={wFull}>
                <div className="form-group">
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    sx={wFull}
                  />
                </div>
              </FormControl>
            )}
          />
          <Controller
            name="leader"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <FormControl sx={wFull}>
                <div className="form-group">
                  <InputLabel id="lead">Leader</InputLabel>
                  <Select {...field} labelId="lead" label="lead" sx={wFull}>
                    {leads?.map(
                      (lead: {
                        id: number;
                        firstname: string;
                        lastname: string;
                        email: string;
                        role: string;
                      }) => (
                        <MenuItem value={lead.id} key={lead.id}>
                          {lead.firstname} {lead.lastname}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </div>
              </FormControl>
            )}
          />

          <Controller
            name="member"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <FormControl sx={wFull}>
                <div className="form-group">
                  <InputLabel id="member">Member</InputLabel>
                  <Select
                    {...field}
                    labelId="member"
                    label="member"
                    sx={wFull}
                    multiple
                    defaultValue={[]}
                  >
                    {users?.map(
                      (user: {
                        id: number;
                        firstname: string;
                        lastname: string;
                        email: string;
                        role: string;
                      }) => (
                        <MenuItem value={user.id} key={user.id}>
                          {user.firstname} {user.lastname}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </div>
              </FormControl>
            )}
          />

          <Controller
            name="intern"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <FormControl sx={wFull}>
                <div className="form-group">
                  <InputLabel id="intern">Interns</InputLabel>
                  <Select
                    {...field}
                    labelId="intern"
                    label="intern"
                    sx={wFull}
                    multiple
                    defaultValue={[]}
                  >
                    {users?.map(
                      (user: {
                        id: number;
                        firstname: string;
                        lastname: string;
                        email: string;
                        role: string;
                      }) => (
                        <MenuItem value={user.id} key={user.id}>
                          {user.firstname} {user.lastname}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </div>
              </FormControl>
            )}
          />

          <FormControl sx={wFull}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: ".75rem", fontWeight: "bold" }}
            >
              Submit
            </Button>
          </FormControl>
        </>
      </form>
    </section>
  );
};

export default CreateTeam;

import { FC, useState } from "react";
import {
  Group,
  Image,
  Button,
  Text,
  TextInput,
  Textarea,
  RadioGroup,
  Radio,
  Loader,
  Modal,
} from "@mantine/core";
import { useMediaQuery, useForm } from "@mantine/hooks";
import AddIcon from "@mui/icons-material/Add";
import Logo from "src/assets/event.svg";
import { DatePicker, TimeInput } from "@mantine/dates";
import { collection, addDoc } from "firebase/firestore";
import { db } from "src/utils";
import { useSelector } from "react-redux";
import { State } from "src/store/accountReducer";

export const HeaderItems: FC = () => {
  const account = useSelector((state: State) => state.account);
  const matches = useMediaQuery("(min-width: 500px)");
  const [loading, setLoading] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      certainty: "certain",
      date: new Date(),
      time: new Date(),
    },
  });

  const closeForm = () => {
    if (loading) return;
    setOpened(false);
    form.reset();
  };

  const handleSave = async (values: {
    title: string;
    description: string;
    certainty: string;
    date: Date;
    time: Date;
  }) => {
    setLoading(true);
    const { title, description, certainty, date, time } = values;
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
    date.setSeconds(0);

    try {
      await addDoc(collection(db, "events"), {
        title,
        description,
        certainty,
        date: Date.parse(date as unknown as string),
        user: account.user.id,
        createdAt: new Date().getTime(),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      closeForm();
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Group>
          <Image
            src={Logo}
            alt="Logo"
            width={28}
            imageProps={{ draggable: false }}
          />
          {matches && <Text size="md">Event Board</Text>}
        </Group>

        <Button
          variant="outline"
          leftIcon={<AddIcon />}
          onClick={() => setOpened(true)}
        >
          Create an Event
        </Button>
      </div>

      <Modal
        opened={opened}
        onClose={closeForm}
        title="Create an Event"
        centered
        overlayColor="gray"
        overlayOpacity={0.8}
        styles={{
          close: { cursor: loading ? "wait" : "pointer" },
        }}
      >
        <form
          onSubmit={form.onSubmit(handleSave)}
          style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}
        >
          <TextInput
            label="Title"
            required
            data-autofocus
            {...form.getInputProps("title")}
          />
          <Textarea
            label="Description"
            required
            {...form.getInputProps("description")}
          />
          <RadioGroup
            label="Certainty"
            spacing="lg"
            size="sm"
            required
            {...form.getInputProps("certainty")}
          >
            <Radio value="certain">Certain</Radio>
            <Radio value="maybe">Maybe</Radio>
          </RadioGroup>
          <Group>
            <DatePicker
              label="Event date"
              required
              minDate={new Date()}
              allowFreeInput
              sx={{ flexGrow: 2 }}
              {...form.getInputProps("date")}
            />

            <TimeInput
              label="Event time"
              required
              sx={{ flexGrow: 1 }}
              {...form.getInputProps("time")}
            />
          </Group>

          <Button fullWidth sx={{ marginTop: 15 }} type="submit">
            {loading ? <Loader size="sm" color="lime" /> : "Submit"}
          </Button>
        </form>
      </Modal>
    </>
  );
};

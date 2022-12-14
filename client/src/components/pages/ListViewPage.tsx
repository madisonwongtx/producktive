import React from "react";
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { del, get, List, MUI_BUTTON_STYLE, patch, post } from "../../util";
import { Edit, Lock } from "@mui/icons-material";

const ListView = () => {
  const [lists, setLists] = React.useState<List[]>();
  const [newList, setNewList] = React.useState<List>({
    _id: "Not set",
    title: "",
  });

  React.useEffect(() => {
    get("/api/lists/all").then((lists) => {
      if (lists?.error) {
        setLists([]);
        window.alert("Error getting lists");
      } else {
        setLists(lists);
      }
    });
  }, []);

  const submitList = () => {
    post("/api/lists/", { title: newList.title }).then((list) => {
      if (list?.error) {
        window.alert(list.error);
      } else {
        setLists([...(lists || []), list]);
      }
    });
  };

  const deleteList = (id: string) => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      del(`/api/lists/${id}`).then((list) => {
        if (list?.error) {
          window.alert(list.error);
        } else {
          setLists(lists.filter((l) => l._id !== id));
        }
      });
    }
  };

  const editListName = (id: string, title: string) => {
    patch(`/api/lists/${id}`, { title }).then((list) => {
      if (list?.error) {
        window.alert(list.error);
      } else {
        setLists(lists.map((l) => (l._id === id ? list : l)));
      }
    });
  };

  return (
    <div className="flex flex-column primary-text">
      <h1 className="tc f-subheadline ma0 pa0 ">Todo Lists</h1>
      <div className="flex flex-column w-70 m-auto">
        {(!lists || !lists.length) && <h3>You don't have any lists!</h3>}
        {lists?.map((list, index) => (
          <ListNode
            list={list}
            key={`listitem${index}`}
            deleteList={deleteList}
            editListName={editListName}
          />
        ))}
        <hr />
        <TextField
          placeholder="Create a new list..."
          className="bg-near-white ma1"
          value={newList.title}
          onChange={(e) => setNewList({ ...newList, title: e.target.value })}
        />
        <Button
          onClick={submitList}
          style={MUI_BUTTON_STYLE}
          variant="contained"
        >
          Create List
        </Button>
      </div>
    </div>
  );
};

const ListNode = ({
  list,
  editListName,
  deleteList,
}: {
  list: List;
  editListName: (id: string, title: string) => void;
  deleteList: (id: string) => void;
}) => {
  const [editing, setEditing] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>(list.title);

  return (
    <div className="flex flex-row items-center">
      {editing ? (
        <TextField value={title} onChange={(e) => setTitle(e.target.value)} />
      ) : (
        <Link
          className="f2 fw3 no-underline primary-text underline-hover"
          to={`/list/${list._id}`}
        >
          {title}
        </Link>
      )}{" "}
      <Tooltip arrow title={editing ? "Save" : "Edit"}>
        <IconButton
          onClick={() => {
            if (editing) {
              editListName(list._id, title);
            }
            setEditing(!editing);
          }}
          className="w-fc"
        >
          {editing ? <Lock className="black" /> : <Edit className="black" />}
        </IconButton>
      </Tooltip>
      <Tooltip arrow title="Delete">
        <IconButton onClick={() => deleteList(list._id)} className="w-fc">
          <DeleteIcon className="dark-red" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ListView;

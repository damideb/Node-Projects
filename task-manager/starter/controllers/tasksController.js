const Tasks = require("../model/task");

const getAllTasks = async (req, res) => {
  
  try{
    const tasks = await Tasks.find({});
 if (!tasks) return res.status(204).json({ message: "Task not found" });
  res.json(tasks);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
 
};
const createTask = async (req, res) => {
  try {
    const result = await Tasks.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Tasks.findOne({ _id: req.params.id }).exec();
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const updateTask = async (req, res) => {
  try{
 const task = await Tasks.findOneAndUpdate(
    { _id: req.params.id },
    req.body,{
      new: true,
      runValidators: true,
    }
  );
  if (!task) return res.status(404).json({ message: "Task not found" });

  res.status(200).json(task);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
 
};

const deleteTask = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID is required" });
  }
  try {
    const task = await Tasks.findOneAndDelete({ _id: req.params.id });
    if (!task) return res.status(204).json({ message: "Task not found" });

    res.status(200).json({task});
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: `No task with the id ${req.params.id}` });
  }
};

module.exports = { getAllTasks, createTask, deleteTask, updateTask, getTask };

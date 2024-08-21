<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="{{ asset('css/bootstrap.min.css')}}" rel="stylesheet">
    <script src="{{ asset('js/todo.js')}}"></script>
    <script src="{{ asset('js/bootstrap.min.js')}}"></script>

    <title>Simple Todo</title>
</head>

<body onload="init();">
    <div class="container mt-4">
        <h2 class="mt-4">PHP - Simple To Do List App</h2>
        <hr />
        <div class="container mt-4 d-flex flex-row mb-4 justify-content-center">

            <input style="width: 70%;margin-right: 8px" type="text" class="form-control" id="taskTfield">
            <button type="button" class="btn btn-primary" onclick="addTask();">Add Task</button>

        </div>
        <table class="table" id="taskTable">
            <thead>
                <tr>
                    <th style="width: 10%;" scope="col">#</th>
                    <th style="max-width: 700px" scope="col">Task</th>
                    <th style="width: 12%;" scope="col">Status</th>
                    <th style="width: 12%;" scope="col">Action</th>
                </tr>
            </thead>
            <tbody id="taskTableTbody">

            </tbody>
        </table>
        <button type="button" id="taskToggleBtn" class="btn btn-link" onclick="toggleAllTasks();">Show all tasks</button>
    </div>
    <div class="container">
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Are you sure?</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="deleteModalBody" style="word-wrap: break-word;">

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deleteTodo();">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
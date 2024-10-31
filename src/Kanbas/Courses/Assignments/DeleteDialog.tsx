export default function DeleteDialog({ assignmentID, deleteAssignment }: { assignmentID: String, deleteAssignment: (assignmentID: String) => void; }) {
    return (
        <div id="wd-delete-module-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            Are you sure want to delete?</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Cancel </button>
                        <button type="button" data-bs-dismiss="modal" className="btn btn-danger" onClick={() => deleteAssignment(assignmentID)}>
                            Proceed </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

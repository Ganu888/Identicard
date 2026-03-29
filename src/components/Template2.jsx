import { QRCodeSVG } from "qrcode.react"
import "../styles/Template2.css"

const getAcademicYearLabel = (dateOfAdmission) => {
  if (!dateOfAdmission) return null;
  const startYear = new Date(dateOfAdmission).getFullYear();
  if (Number.isNaN(startYear)) return null;
  const endYear = startYear + 3;
  return `Valid for Academic Year: ${startYear}\u2013${endYear}`;
};

const Template2 = ({ studentData, qrCodeData }) => {
  const academicYearLabel = getAcademicYearLabel(studentData.dateOfAdmission);
  return (
    <div className="template2">
      <div className="card-header-t2">
        <h4>College of Computer Science and Information Technology, Ambajogai Road, Latur 413 531</h4>
        <p>Student Identification Card</p>
      </div>

      <div className="card-body-t2">
        <div className="card-left-t2">
          <div className="student-photo-t2">
            <img src={studentData.photoPreview || "/placeholder.svg"} alt={studentData.name} />
          </div>

          <div className="qr-code-t2">
            <QRCodeSVG
              value={qrCodeData}
              size={100}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"L"}
              includeMargin={false}
            />
          </div>
        </div>

        <div className="card-right-t2">
          <table className="student-details-t2-table">
            <tbody>
              <tr>
                <td className="detail-label-t2">Name:</td>
                <td>{studentData.name}</td>
              </tr>
              <tr>
                <td className="detail-label-t2">DOB:</td>
                <td>{studentData.dob}</td>
              </tr>
              <tr>
                <td className="detail-label-t2">Class:</td>
                <td>{studentData.classDiv}</td>
              </tr>
              <tr>
                <td className="detail-label-t2">Mob:</td>
                <td>{studentData.mobile}</td>
              </tr>
              <tr>
                <td className="detail-label-t2">Address:</td>
                <td>{studentData.address || "-"}</td>
              </tr>
              <tr>
                <td className="detail-label-t2">Principal&apos;s Signature:</td>
                <td>
                  {studentData.principalSignaturePreview ? (
                    <img
                      className="principal-signature-image-t2"
                      src={studentData.principalSignaturePreview || "/placeholder.svg"}
                      alt="Principal Signature"
                    />
                  ) : (
                    <div className="signature-placeholder-line-t2" />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card-footer-t2">
        <p>This card is the property of <b>COCSIT Latur</b>. If found, please return to the COCSIT Latur office.</p>
        {academicYearLabel && <p>{academicYearLabel}</p>}
      </div>
    </div>
  )
}

export default Template2

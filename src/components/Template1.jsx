import { QRCodeSVG } from "qrcode.react"
import "../styles/Template1.css"


const getAcademicYearLabel = (dateOfAdmission) => {
  if (!dateOfAdmission) return null;
  const startYear = new Date(dateOfAdmission).getFullYear();
  if (Number.isNaN(startYear)) return null;
  const endYear = startYear + 3;
  return `Valid for Academic Year: ${startYear}\u2013${endYear}`;
};

const Template1 = ({ studentData, qrCodeData }) => {
  const academicYearLabel = getAcademicYearLabel(studentData.dateOfAdmission);
  return (
    <div className="template1">
      <div className="card-header">
        <div className="logo-secction" >
          <img src="/cocsit.png" alt="College LOgo" className="header-logo" />

        </div>
        <div className="text-section">
          <h4 className="college-name">College of Computer Science and Information Technology,</h4>
          <p className="location"> Ambajogai Road, Latur 413 531</p>
          <p className="card-title">Student Identification Card</p>
        </div>
        <div className="logo-spacer"></div>

      </div>

      <div className="card-body">
        <div className="card-left">
          <div className="student-photo">
            <img src={studentData.photoPreview || "/placeholder.svg"} alt={studentData.name} />
          </div>

          <div className="qr-code">
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

        <div className="card-right">
          <table className="student-details">
            <tbody>
              <tr>
                <td className="detail-label">Name:</td>
                <td>{studentData.name}</td>
              </tr>
              <tr>
                <td className="detail-label">DOB:</td>
                <td>{studentData.dob}</td>
              </tr>
              <tr>
                <td className="detail-label">Class:</td>
                <td>{studentData.classDiv}</td>
              </tr>
              <tr>
                <td className="detail-label">Mob:</td>
                <td>{studentData.mobile}</td>
              </tr>
              <tr>
                <td className="detail-label">Address:</td>
                <td>{studentData.address || "-"}</td>
              </tr>
              <tr>
                <td className="detail-label">Principal&apos;s Signature:</td>
                <td>
                  {studentData.principalSignaturePreview ? (
                    <img
                      className="principal-signature-image"
                      src={studentData.principalSignaturePreview || "/placeholder.svg"}
                      alt="Principal Signature"
                    />
                  ) : (
                    <div className="signature-placeholder-line" />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card-footer">
        <p>This card is the property of COCSIT Latur. If found, please return to the COCSIT Latur office.</p>
        {academicYearLabel && <p>{academicYearLabel}</p>}
      </div>
    </div>
  )
}

export default Template1

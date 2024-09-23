import pool from "../../db/connectDB.js";

async function getPrescriptionsListQuery({ id }) {
  try {
    const [result] = await pool.execute(
      `
    select 
        pres.id,
        pres.medication_name as medication,
        pres.dosage,
        pres.status,
        p.id as patient_id, 
        p.name as patient_name
    from 
        prescriptions pres join patients p 
    on 
        pres.patient_id = p.id
    where  
        doctor_id = ?
    and 
        pres.status = 'Active';`,
      [id]
    );
    return result;
  } catch (error) {
    throw new Error(`Database error: ${error}`);
  }
}

async function markPrescriptionAsCompleteQuery({ id }) {
  try {
    await pool.execute(
      `
      UPDATE prescriptions
      SET status = 'Completed'
      WHERE ID = ?;`,
      [id]
    );
    return;
  } catch (error) {
    throw new Error(`Database error: ${error}`);
  }
}

async function addPrescriptionQuery({
  doctor_id,
  patient_id,
  medication_name,
  dosage,
}) {
  try {
    await pool.execute(
      `
      INSERT INTO prescriptions (doctor_id, patient_id, medication_name, dosage)
      VALUES (?, ?, ?, ?)`,
      [doctor_id, patient_id, medication_name, dosage]
    );
    return;
  } catch (error) {
    throw new Error(`Database error: ${error}`);
  }
}

async function editPrescriptionQuery({ id, medication_name, dosage }) {
  try {
    await pool.execute(
      `
      UPDATE prescriptions set medication_name = ?, dosage = ? where id = ?      
      `,
      [medication_name, dosage, id]
    );
    return;
  } catch (error) {
    throw new Error(`Database Error: ${error}`);
  }
}

export {
  getPrescriptionsListQuery,
  markPrescriptionAsCompleteQuery,
  addPrescriptionQuery,
  editPrescriptionQuery,
};

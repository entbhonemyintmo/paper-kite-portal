import { parse } from "csv-parse/browser/esm";

const validatePhoneNumberFile = (
  fileData,
  recipient_column_index = "phone_numbers"
) => {
  return new Promise((resolve, reject) => {
    const parser = parse({ delimiter: "," });
    let phoneNumbersColumnIndex = -1;
    let rowNumber = 0;

    parser.on("data", (data) => {
      rowNumber++;

      if (phoneNumbersColumnIndex === -1) {
        phoneNumbersColumnIndex = data.findIndex((value) =>
          value.startsWith(recipient_column_index)
        );

        if (
          recipient_column_index === "phone_numbers" &&
          phoneNumbersColumnIndex !== 0
        ) {
          reject("1st column of your file must be 'phone_numbers' column");
          return;
        }
      }
      // else {
      //   const phoneNumber = data[phoneNumbersColumnIndex];

      //   if (!phoneNumber.startsWith("959")) {
      //     reject(`Invalid value in row ${rowNumber}. Expected '959' prefix.`);
      //     return;
      //   }
      // }
    });

    parser.on("end", () => resolve(true));

    parser.on("error", (error) => reject(error));

    parser.write(fileData);
    parser.end();
  });
};

export default validatePhoneNumberFile;

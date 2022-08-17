import { BluetoothSerialPort } from "bluetooth-serial-port";

let connected: boolean = false;

const { BLUETOOTH_ADDRESS } = process.env;
const bluetooth = new BluetoothSerialPort();

const makeOnConnect = (callback: (connected: boolean) => void) => {
  return () => {
    connected = true;
    callback(connected);
  };
};

const onDeviceFound = (channel: number) => {
  return new Promise((resolve) => {
    const onConnect = makeOnConnect(resolve);

    bluetooth.connect(
      BLUETOOTH_ADDRESS!,
      channel,
      onConnect,
      bluetooth.close
    );
  });
};

export const searchAndConnect = () => {
  return new Promise((resolve) => {
    bluetooth.findSerialPortChannel(
      BLUETOOTH_ADDRESS!,
      (channel: number) => {
        onDeviceFound(channel).then(resolve);
      },
      () => setTimeout(searchAndConnect, 5000)
    );
  });
};

export const sendAnimation = (frames: string[]) => {
  if (!connected) return false;

  for (const frame of frames) {
    const buffer = Buffer.from(frame, "base64");
    bluetooth.write(buffer, () => void 0);
  }

  return true;
};

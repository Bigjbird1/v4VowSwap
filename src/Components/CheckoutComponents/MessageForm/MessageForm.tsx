interface MessageFormProps {
  required: boolean;
  message: string;
  onMessageChange: (message: string) => void;
  placeholder?: string;
}

export default function MessageForm({
  required,
  message,
  onMessageChange,
  placeholder,
}: MessageFormProps) {
  return (
    <textarea
      rows={5}
      name="message"
      id="message"
      className="block w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-transparent focus:ring focus:ring-gray-500 focus:ring-2 sm:text-sm sm:leading-6 bg-white py-1.5 text-gray-900 placeholder:text-gray-400"
      placeholder={placeholder}
      required={required}
      value={message}
      onChange={(e) => onMessageChange(e.target.value)}
    />
  );
}

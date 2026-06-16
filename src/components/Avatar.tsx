import { Image, Text, View } from "react-native";

interface AvatarProps {
  uri?: string | null;
  name?: string;
  size?: number;
}

function getInitials(name?: string) {
  if (!name) return "?";
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function Avatar({ uri, name, size = 40 }: AvatarProps) {
  const style = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={style}
        className="bg-slate-200"
      />
    );
  }

  return (
    <View
      style={style}
      className="bg-primary-100 items-center justify-center"
    >
      <Text
        style={{ fontSize: size * 0.38, lineHeight: size * 0.38 * 1.2 }}
        className="text-primary-700 font-semibold"
      >
        {getInitials(name)}
      </Text>
    </View>
  );
}

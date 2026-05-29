import type { SVGProps } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight,
  Clock3,
  Download,
  Home,
  LayoutDashboard,
  Leaf,
  LockKeyhole,
  Mail,
  MapPin,
  Minus,
  Package,
  Package2,
  PackageCheck,
  Phone,
  Play,
  Plus,
  ReceiptText,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Store,
  StoreIcon as StoreDetail,
  Trash2,
  UserRound,
  Wallet,
  WifiOff,
  X,
} from "@hugeicons/core-free-icons";

type IconNode = Parameters<typeof HugeiconsIcon>[0]["icon"];

type IconProps = Omit<SVGProps<SVGSVGElement>, "ref"> & {
  size?: number | string;
  strokeWidth?: number;
};

function createIcon(icon: IconNode) {
  return function Icon({ size = 24, strokeWidth = 1.7, className, ...props }: IconProps) {
    return (
      <HugeiconsIcon
        icon={icon}
        size={size}
        strokeWidth={strokeWidth}
        color="currentColor"
        className={className}
        {...props}
      />
    );
  };
}

export const ArrowRightIcon = createIcon(ArrowRight);
export const Clock3Icon = createIcon(Clock3);
export const DownloadIcon = createIcon(Download);
export const HomeIcon = createIcon(Home);
export const LayoutDashboardIcon = createIcon(LayoutDashboard);
export const LeafIcon = createIcon(Leaf);
export const LockKeyholeIcon = createIcon(LockKeyhole);
export const MailIcon = createIcon(Mail);
export const MapPinIcon = createIcon(MapPin);
export const MinusIcon = createIcon(Minus);
export const PackageCheckIcon = createIcon(PackageCheck);
export const Package2Icon = createIcon(Package2);
export const PackageIcon = createIcon(Package);
export const PhoneIcon = createIcon(Phone);
export const PlayIcon = createIcon(Play);
export const PlusIcon = createIcon(Plus);
export const ReceiptTextIcon = createIcon(ReceiptText);
export const SearchIcon = createIcon(Search);
export const SettingsIcon = createIcon(Settings);
export const ShoppingBagIcon = createIcon(ShoppingBag);
export const ShoppingCartIcon = createIcon(ShoppingCart);
export const SparklesIcon = createIcon(Sparkles);
export const StarIcon = createIcon(Star);
export const StoreIconAlt = createIcon(StoreDetail);
export const StoreIcon = createIcon(Store);
export const Trash2Icon = createIcon(Trash2);
export const UserRoundIcon = createIcon(UserRound);
export const WalletIcon = createIcon(Wallet);
export const WifiOffIcon = createIcon(WifiOff);
export const XIcon = createIcon(X);

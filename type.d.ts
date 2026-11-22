import type { ImageSource } from "expo-image";

declare global {
    interface AppTab {
        name: string;
        title: string;
        icon: ImageSource;
    }

    interface TabIconProps {
        focused: boolean;
        icon: ImageSource;
    }

    interface Subscription {
        id: string;
        icon: ImageSource;
        name: string;
        plan?: string;
        category?: string;
        paymentMethod?: string;
        status?: string;
        startDate?: string;
        price: number;
        currency?: string;
        billing: string;
        renewalDate?: string;
        color?: string;
    }

    interface SubscriptionCardProps extends Omit<Subscription, "id"> {
        expanded: boolean;
        onPress: () => void;
        onCancelPress?: () => void;
        isCancelling?: boolean;
    }

    interface UpcomingSubscription {
        id: string;
        icon: ImageSource;
        name: string;
        price: number;
        currency?: string;
        daysLeft: number;
    }

    interface UpcomingSubscriptionCardProps
        extends Omit<UpcomingSubscription, "id"> {}

    interface ListHeadingProps {
        title: string;
    }
}

export { };

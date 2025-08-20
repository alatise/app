import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TabWrapperProps = React.PropsWithChildren<{}>;

const TabWrapper: React.FC<TabWrapperProps> = ({ children }) => {
    return (
        <SafeAreaView edges={['left', 'right']} style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 16, paddingTop: 10 }}>
            <ScrollView showsHorizontalScrollIndicator={false} className="flex-1 bg-white">
                <StatusBar style="light" backgroundColor="#ffffff" />
                {children}
            </ScrollView>
        </SafeAreaView>
    )
}

export default TabWrapper
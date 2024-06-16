import { type Context, type ParentProps, type Resource, Show, createContext, useContext } from 'solid-js';
import useCommand from './useCommand';
import type { Cluster } from '~bindings';
import { bridge } from '~index';

const ClusterContext = createContext<Cluster>() as Context<Cluster>;

export function getCluster(uuid: string | undefined | null): Resource<Cluster> | undefined {
	if (typeof uuid !== 'string' || uuid.length === 0)
		return undefined;

	const [resource] = useCommand(bridge.commands.getCluster, uuid);
	return resource;
}

export function ClusterProvider(props: ParentProps & { uuid: string | undefined }) {
	// eslint-disable-next-line solid/reactivity
	const cluster = getCluster(props.uuid);

	return (
		<Show when={cluster !== undefined && cluster() !== undefined}>
			<ClusterContext.Provider value={cluster!()!}>
				{props.children}
			</ClusterContext.Provider>
		</Show>
	);
}

export function useClusterContext() {
	const context = useContext(ClusterContext);

	if (!context)
		throw new Error('useClusterContext should be called inside its ClusterProvider');

	return context;
}

export default useClusterContext;
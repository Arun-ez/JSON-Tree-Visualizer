'use client';
import '@xyflow/react/dist/style.css';

import { toast } from 'sonner';
import { Search } from 'lucide-react';
import { useCallback, useState, FormEvent, useEffect } from 'react';
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, BackgroundVariant, Controls, ReactFlow, useReactFlow } from '@xyflow/react';

interface FlowTree {
    initialNodes: any[];
    initialEdges: any[];
}

const JsonTree = ({ tree }: { tree: FlowTree }) => {

    const [nodes, setNodes] = useState(tree?.initialNodes || []);
    const [edges, setEdges] = useState(tree?.initialEdges || []);

    const { setCenter, setViewport } = useReactFlow();

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    const onSearch = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const id = new FormData(e.currentTarget).get('query');
            const node = nodes.find((node) => node.id == id);
            if (node) {
                setCenter(node.position.x, node.position.y, { zoom: 1, duration: 800 });
            } else {
                toast.error('No matches found');
            }
        },
        []
    );

    useEffect(
        () => {
            if (nodes.length > 0) {
                const { x, y } = nodes[0].position;
                setViewport({ x: x - 200, y: y + 200, zoom: 1.2 }, { duration: 400 });
            }
        },
        [nodes, setViewport]
    );

    return (
        <div className='w-2/3 relative'>
            <form
                onSubmit={onSearch}
                className='py-4 absolute flex justify-center gap-2 left-0 right-0 z-2 select-none'
            >
                <input
                    type="search"
                    name='query'
                    placeholder='Search'
                    className='bg-white dark:bg-black/95 focus:outline-none border border-gray-200 dark:border-gray-800 rounded-full px-4 py-2 text-sm w-full max-w-xs placeholder:text-gray-600'
                />
                <button className='bg-white dark:bg-black/95 focus:outline-none border border-gray-200 dark:border-gray-800 p-2 rounded-full'>
                    <Search size={20} strokeWidth={'1.4'} className='text-gray-600' />
                </button>
            </form>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                proOptions={{ hideAttribution: true }}
                className='px-4'
                nodesDraggable={false}
                fitView
            >
                <Controls className="dark:text-gray-900 rounded-lg overflow-hidden" />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}

export { JsonTree }

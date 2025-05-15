import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TutorialDataService from "../services/TutorialService";
import { mapCategories, mapDifficulty } from '../services/Util';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Chip } from 'primereact/chip';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';
import ActionButtons from './common/ActionButtons';
import { Button } from 'primereact/button';

const Published = () => {
    const navigate = useNavigate();
    const toast = useRef(null);
    const [tutorials, setTutorials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        getAllPublishedTutorials();
    }, []);

    const updatePublished = (tutorial, newStatus) => {
        setProcessing(true);
        
        const data = {
            ...tutorial,
            published: newStatus
        };
    
        TutorialDataService.update(tutorial.id, data)
            .then(() => {
                toast.current.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: newStatus ? 'Tutorial published successfully' : 'Tutorial unpublished successfully',
                    life: 3000
                });
                getAllPublishedTutorials();
                setProcessing(false);
            })
            .catch(error => {
                console.error("Error updating status:", error);
                toast.current.show({
                    severity: 'error',
                    summary: 'Update Failed',
                    detail: 'Failed to update tutorial status',
                    life: 3000
                });
                setProcessing(false);
            });
    };

    const getAllPublishedTutorials = async () => {
        setLoading(true);
        try {
            const response = await TutorialDataService.findAllPublished();
            
            // Apply category mapping
            const categoryMapped = await mapCategories(response.data);
            
            // Apply difficulty mapping
            const fullMappedData = mapDifficulty(categoryMapped);
            
            setTutorials(fullMappedData);
            setLoading(false);
        } catch (error) {
            console.error("Error loading published tutorials:", error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to load published tutorials',
                life: 3000
            });
            setLoading(false);
        }
    };

    const handleEditTutorial = (tutorial) => {
        navigate(`/tutorials/${tutorial.id}`);
    };

    const handleUnpublish = (tutorial) => {
        updatePublished(tutorial, false);
    };

    const handleNewTutorial = () => {
        navigate('/add');
    };

    // Templates for DataTable
    const titleTemplate = (rowData) => {
        return (
            <div className="d-flex align-items-center">
                {rowData.imageUrl && (
                    <img 
                        src={rowData.imageUrl} 
                        alt={rowData.title}
                        className="mr-2 rounded" 
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    />
                )}
                <span className="font-weight-bold">{rowData.title}</span>
            </div>
        );
    };

    const categoryTemplate = (rowData) => {
        return rowData.category ? 
            <Chip label={rowData.category} className="p-2" /> : 
            <span className="text-muted">None</span>;
    };

    const difficultyTemplate = (rowData) => {
        const severityMap = {
            beginner: 'info',
            intermediate: 'warning',
            advanced: 'danger'
        };
        
        if (!rowData.difficulty) return <span className="text-muted">Not set</span>;
        
        const label = rowData.difficulty.charAt(0).toUpperCase() + rowData.difficulty.slice(1);
        return <Tag severity={severityMap[rowData.difficulty]} value={label} />;
    };

    const statsTemplate = (rowData) => {
        return (
            <div>
                <span className="mr-3">
                    <i className="pi pi-eye mr-1"></i> {rowData.viewCount || 0}
                </span>
                <span>
                    <i className="pi pi-thumbs-up mr-1"></i> {rowData.likes || 0}
                </span>
            </div>
        );
    };

    const actionsTemplate = (rowData) => {
        return (
            <div className="d-flex">
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-text p-button-info mr-2"
                    onClick={() => handleEditTutorial(rowData)}
                    tooltip="Edit"
                />
                <Button
                    icon="pi pi-eye-slash"
                    className="p-button-rounded p-button-text p-button-warning"
                    onClick={() => handleUnpublish(rowData)}
                    tooltip="Unpublish"
                    disabled={processing}
                />
            </div>
        );
    };

    if (loading) {
        return (
            <div className="p-5 text-center">
                <ProgressBar mode="indeterminate" style={{ height: '6px' }} />
                <p className="mt-3">Loading published tutorials...</p>
            </div>
        );
    }

    return (
        <div className="published-tutorials p-3">
            <Toast ref={toast} position="bottom-right" />
            
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
                <h2 className="mb-1">Published Tutorials</h2>
                <div className="mt-3 mt-md-0">
                    <ActionButtons 
                        onSave={handleNewTutorial}
                        showCancel={false}
                        saveLabel="Add New Tutorial"
                        saveDisabled={processing}
                    />
                </div>
            </div>
            
            <Card className="shadow-sm">
                <DataTable 
                    value={tutorials} 
                    paginator 
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    emptyMessage="No published tutorials found"
                    className="p-datatable-sm"
                    responsiveLayout="scroll"
                    stripedRows
                >
                    <Column field="title" header="Title" body={titleTemplate} sortable style={{ minWidth: '16rem' }} />
                    <Column header="Category" body={categoryTemplate} sortable field="category" style={{ minWidth: '10rem' }} />
                    <Column header="Difficulty" body={difficultyTemplate} sortable field="difficulty" style={{ minWidth: '10rem' }} />
                    <Column header="Stats" body={statsTemplate} style={{ minWidth: '8rem' }} />
                    <Column body={actionsTemplate} exportable={false} style={{ minWidth: '8rem', textAlign: 'center' }} />
                </DataTable>
            </Card>
        </div>
    );
};

export default Published;
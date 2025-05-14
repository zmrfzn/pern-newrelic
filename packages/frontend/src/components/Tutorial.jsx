import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import TutorialDataService from "../services/TutorialService";
import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { InputNumber } from 'primereact/inputnumber';
import { Chips } from 'primereact/chips';
import { mapDifficulty } from "../services/Util";

const Tutorial = () => {
  const toast = useRef(null);
  const { id } = useParams();
  let navigate = useNavigate();

  const initialTutorialState = {
    id: null,
    title: "",
    category: "",
    description: "",
    published: false,
    author: "",
    readTime: 0,
    difficulty: "beginner",
    tags: "",
    imageUrl: "",
    viewCount: 0,
    likes: 0
  };
  
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [loading, setLoading] = useState(true);
  const [dirty, setDirty] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [tagArray, setTagArray] = useState([]);
  
  const difficultyOptions = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' }
  ];

  useEffect(() => {
    if (id) {
      loadTutorial();
    } else {
      setLoading(false);
    }
  }, [id]);

  const loadTutorial = async () => {
    setLoading(true);
    try {
      // Get categories first
      const categoriesData = await TutorialDataService.getCategories();
      setCategories(categoriesData);
      
      // Then get tutorial details
      const response = await TutorialDataService.get(id);
      const tutorialData = response.data;
      
      // Apply difficulty mapping
      const mappedTutorial = mapDifficulty(tutorialData);
      
      // Convert tags string to array if exists
      const tagsArray = mappedTutorial.tags ? mappedTutorial.tags.split(',') : [];
      setTagArray(tagsArray);
      
      setTutorial(mappedTutorial);
      setSelectedCategory(categoriesData.find(c => c.id == mappedTutorial.category) || null);
      setLoading(false);
    } catch (error) {
      console.error("Error loading tutorial:", error);
      navigate(`/404/${id}`);
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
    setDirty(true);
  };

  const handleNumberChange = (name, value) => {
    setTutorial({ ...tutorial, [name]: value });
    setDirty(true);
  };

  const onCategoryChange = (event) => {
    setSelectedCategory(event.value);
    setTutorial({...tutorial, 'category': event.value.id});
    setDirty(true);
  };
  
  const onDifficultyChange = (event) => {
    setTutorial({...tutorial, 'difficulty': event.value});
    setDirty(true);
  };
  
  const onTagsChange = (tags) => {
    setTagArray(tags);
    setTutorial({...tutorial, 'tags': tags.join(',')});
    setDirty(true);
  };

  const togglePublished = () => {
    updatePublishedStatus(!tutorial.published);
  };

  const updatePublishedStatus = (newStatus) => {
    setProcessing(true);
    
    const updatedTutorial = {
      ...tutorial,
      published: newStatus
    };
    
    TutorialDataService.update(tutorial.id, updatedTutorial)
      .then(() => {
        setTutorial({ ...tutorial, published: newStatus });
        
        toast.current.show({
          severity: 'success',
          summary: 'Status Updated',
          detail: newStatus ? 'Tutorial published successfully' : 'Tutorial unpublished',
          life: 3000
        });
        
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

  const saveTutorial = () => {
    if (!tutorial.title) {
      toast.current.show({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Title is required',
        life: 3000
      });
      return;
    }
    
    setProcessing(true);
    
    TutorialDataService.update(tutorial.id, tutorial)
      .then(() => {
        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Tutorial updated successfully',
          life: 3000
        });
        
        setDirty(false);
        setProcessing(false);
      })
      .catch(error => {
        console.error("Error updating tutorial:", error);
        
        toast.current.show({
          severity: 'error',
          summary: 'Update Failed',
          detail: 'Failed to update tutorial: ' + error.message,
          life: 3000
        });
        
        setProcessing(false);
      });
  };

  const confirmDeleteTutorial = () => {
    confirmDialog({
      message: 'Are you sure you want to delete this tutorial?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: deleteTutorial
    });
  };

  const deleteTutorial = () => {
    setProcessing(true);
    
    TutorialDataService.remove(tutorial.id)
      .then(() => {
        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Tutorial deleted successfully',
          life: 3000
        });
        
        navigate("/tutorials");
      })
      .catch(error => {
        console.error("Error deleting tutorial:", error);
        
        toast.current.show({
          severity: 'error',
          summary: 'Delete Failed',
          detail: 'Failed to delete tutorial: ' + error.message,
          life: 3000
        });
        
        setProcessing(false);
      });
  };

  if (loading) {
    return (
      <div className="p-5 text-center">
        <ProgressBar mode="indeterminate" style={{ height: '6px' }} />
        <p className="mt-3">Loading tutorial...</p>
      </div>
    );
  }

  const getStatusTag = () => {
    return tutorial.published ? (
      <Tag value="Published" severity="success" />
    ) : (
      <Tag value="Draft" severity="warning" />
    );
  };
  
  const getDifficultyTag = () => {
    const severityMap = {
      beginner: 'info',
      intermediate: 'warning',
      advanced: 'danger'
    };
    
    return (
      <Tag 
        value={tutorial.difficulty?.charAt(0).toUpperCase() + tutorial.difficulty?.slice(1)} 
        severity={severityMap[tutorial.difficulty] || 'info'} 
      />
    );
  };

  const lastUpdated = new Date(tutorial.updatedAt).toLocaleString();

  return (
    <div className="tutorial-editor p-3">
      <Toast ref={toast} position="bottom-right" />
      <ConfirmDialog />
      
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
        <div>
          <h2 className="mb-1">Edit Tutorial</h2>
          <div className="d-flex align-items-center">
            {getStatusTag()}
            <small className="text-muted ml-3">
              Last updated: {lastUpdated}
            </small>
          </div>
        </div>
        
        <div className="mt-3 mt-md-0">
          <Button
            icon="pi pi-arrow-left"
            label="Back to List"
            className="p-button-outlined p-button-secondary mr-2"
            onClick={() => navigate("/tutorials")}
          />
          
          {tutorial.published ? (
            <Button
              icon="pi pi-eye-slash"
              label="Unpublish"
              className="p-button-warning mr-2"
              onClick={togglePublished}
              disabled={processing}
            />
          ) : (
            <Button
              icon="pi pi-check-circle"
              label="Publish"
              className="p-button-success mr-2"
              onClick={togglePublished}
              disabled={processing}
            />
          )}
          
          <Button
            icon="pi pi-trash"
            label="Delete"
            className="p-button-danger"
            onClick={confirmDeleteTutorial}
            disabled={processing}
          />
        </div>
      </div>
      
      <Card className="shadow-sm mb-4">
        <div className="row">
          <div className="col-md-8">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <InputText
                id="title"
                name="title"
                value={tutorial.title}
                onChange={handleInputChange}
                className="w-100"
                placeholder="Enter tutorial title"
                required
              />
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <Dropdown
                    id="category"
                    value={selectedCategory}
                    options={categories}
                    onChange={onCategoryChange}
                    optionLabel="category"
                    placeholder="Select a category"
                    className="w-100"
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="author" className="form-label">Author</label>
                  <InputText
                    id="author"
                    name="author"
                    value={tutorial.author || ''}
                    onChange={handleInputChange}
                    className="w-100"
                    placeholder="Enter author name"
                  />
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="difficulty" className="form-label">Difficulty Level</label>
                  <Dropdown
                    id="difficulty"
                    value={tutorial.difficulty}
                    options={difficultyOptions}
                    onChange={onDifficultyChange}
                    placeholder="Select difficulty"
                    className="w-100"
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="readTime" className="form-label">Read Time (minutes)</label>
                  <InputNumber
                    id="readTime"
                    value={tutorial.readTime}
                    onValueChange={(e) => handleNumberChange('readTime', e.value)}
                    min={1}
                    className="w-100"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="imageUrl" className="form-label">Image URL</label>
              <InputText
                id="imageUrl"
                name="imageUrl"
                value={tutorial.imageUrl || ''}
                onChange={handleInputChange}
                className="w-100"
                placeholder="Enter image URL"
              />
              {tutorial.imageUrl && (
                <div className="mt-2">
                  <img 
                    src={tutorial.imageUrl} 
                    alt="Tutorial preview" 
                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }} 
                    className="rounded"
                  />
                </div>
              )}
            </div>
            
            <div className="mb-3">
              <label htmlFor="tags" className="form-label">Tags</label>
              <Chips
                id="tags"
                value={tagArray}
                onChange={(e) => onTagsChange(e.value)}
                separator=","
                className="w-100"
                placeholder="Add tags and press Enter"
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <InputTextarea
                id="description"
                name="description"
                value={tutorial.description}
                onChange={handleInputChange}
                rows={6}
                className="w-100"
                autoResize
                placeholder="Enter tutorial description"
              />
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card h-100 bg-light">
              <div className="card-body">
                <h5 className="card-title">Tutorial Details</h5>
                <Divider />
                
                <p className="mb-2">
                  <strong>ID:</strong><br />
                  <small className="text-muted">{tutorial.id}</small>
                </p>
                
                <p className="mb-2">
                  <strong>Status:</strong><br />
                  {tutorial.published ? (
                    <Chip label="Published" className="custom-chip published" />
                  ) : (
                    <Chip label="Draft" className="custom-chip pending" />
                  )}
                </p>
                
                <p className="mb-2">
                  <strong>Difficulty:</strong><br />
                  {getDifficultyTag()}
                </p>
                
                <p className="mb-2">
                  <strong>Views:</strong><br />
                  <span className="d-flex align-items-center">
                    <i className="pi pi-eye mr-2"></i>
                    {tutorial.viewCount || 0}
                  </span>
                </p>
                
                <p className="mb-2">
                  <strong>Likes:</strong><br />
                  <span className="d-flex align-items-center">
                    <i className="pi pi-thumbs-up mr-2"></i>
                    {tutorial.likes || 0}
                  </span>
                </p>
                
                <p className="mb-2">
                  <strong>Created:</strong><br />
                  <small className="text-muted">{new Date(tutorial.createdAt).toLocaleString()}</small>
                </p>
                
                <p className="mb-0">
                  <strong>Last Updated:</strong><br />
                  <small className="text-muted">{lastUpdated}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="d-flex justify-content-between mt-4">
        <Button
          icon="pi pi-times"
          label="Cancel"
          className="p-button-outlined p-button-secondary"
          onClick={() => navigate("/tutorials")}
        />
        
        <Button
          icon="pi pi-save"
          label="Save Changes"
          className="p-button-primary"
          onClick={saveTutorial}
          disabled={!dirty || processing}
        />
      </div>
    </div>
  );
};

export default Tutorial;

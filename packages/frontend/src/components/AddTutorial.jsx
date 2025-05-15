import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TutorialDataService from "../services/TutorialService";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { InputNumber } from 'primereact/inputnumber';
import { Chips } from 'primereact/chips';

const AddTutorial = () => {
  const navigate = useNavigate();
  const toast = useRef(null);

  const initialTutorialState = {
    title: "",
    description: "",
    category: "",
    published: false,
    author: "",
    readTime: 10,
    difficulty: "beginner",
    tags: "",
    imageUrl: ""
  };

  const [tutorial, setTutorial] = useState(initialTutorialState);
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
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await TutorialDataService.getCategories();
      setCategories(response);
    } catch (error) {
      console.error("Error loading categories:", error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load categories',
        life: 3000
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const handleNumberChange = (name, value) => {
    setTutorial({ ...tutorial, [name]: value });
  };

  const onCategoryChange = (event) => {
    setSelectedCategory(event.value);
    setTutorial({...tutorial, 'category': event.value.id});
  };
  
  const onDifficultyChange = (event) => {
    setTutorial({...tutorial, 'difficulty': event.value});
  };
  
  const onTagsChange = (tags) => {
    setTagArray(tags);
    setTutorial({...tutorial, 'tags': tags.join(',')});
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
    
    const data = {
      title: tutorial.title,
      description: tutorial.description,
      category: tutorial.category,
      author: tutorial.author,
      readTime: tutorial.readTime,
      difficulty: tutorial.difficulty,
      tags: tutorial.tags,
      imageUrl: tutorial.imageUrl,
      published: false
    };
    
    TutorialDataService.create(data)
      .then((response) => {
        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Tutorial created successfully',
          life: 3000
        });
        
        // Navigate to the edit page for the new tutorial
        navigate(`/tutorials/${response.data.id}`);
      })
      .catch((error) => {
        console.error("Error creating tutorial:", error);
        
        toast.current.show({
          severity: 'error',
          summary: 'Creation Failed',
          detail: 'Failed to create tutorial',
          life: 3000
        });
        
        setProcessing(false);
      });
  };

  return (
    <div className="add-tutorial p-3">
      <Toast ref={toast} position="bottom-right" />
      
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
        <h2>Add New Tutorial</h2>
        <Button
          icon="pi pi-arrow-left"
          label="Back to List"
          className="p-button-outlined p-button-secondary mt-3 mt-md-0"
          onClick={() => navigate("/tutorials")}
        />
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
                placeholder="E.g., Getting Started with React Hooks for Beginners"
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
                    placeholder="E.g., John Smith"
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
                    placeholder="E.g., 10"
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
                placeholder="E.g., https://example.com/images/tutorial-banner.jpg"
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
                placeholder="Add tags like 'javascript', 'react', 'frontend' and press Enter"
              />
              <small className="text-muted">Press Enter after each tag</small>
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
                placeholder="Provide a detailed description of your tutorial. Include what readers will learn, prerequisites, and why this tutorial is valuable. You can use paragraphs to organize your content."
              />
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card h-100 bg-light">
              <div className="card-body">
                <h5 className="card-title">Tutorial Guidelines</h5>
                <hr />
                <ul className="pl-3">
                  <li className="mb-2">Choose a clear, descriptive title</li>
                  <li className="mb-2">Select the most appropriate category</li>
                  <li className="mb-2">Set an accurate difficulty level</li>
                  <li className="mb-2">Estimate realistic reading time</li>
                  <li className="mb-2">Use relevant tags to improve discoverability</li>
                  <li className="mb-2">Add an image to make your tutorial visually appealing</li>
                  <li className="mb-2">Write a comprehensive description</li>
                </ul>
                <p className="mt-3 text-muted">
                  After creation, you&apos;ll be redirected to the edit page where you can make further changes and publish the tutorial when ready.
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
          label="Create Tutorial"
          className="p-button-primary"
          onClick={saveTutorial}
          disabled={processing}
        />
      </div>
    </div>
  );
};

export default AddTutorial;
